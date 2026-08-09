import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';
import * as nodemailer from 'nodemailer';

export interface WaitlistResponse {
  success: boolean;
  message: string;
  id: string;
}

@Injectable()
export class WaitlistService {
  private readonly logger = new Logger('WaitlistService');

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Formats phone numbers to international standard for Brevo (E.164).
   * Prevents the 'Invalid phone number' 400 error seen in production logs.
   */
  private formatPhoneNumber(phone?: string): string {
    if (!phone) return '';

    // Remove all non-numeric characters except a potential leading '+'
    const cleaned = phone.replace(/(?!^\+)\D/g, '');

    // Handle Nigerian local format: 080... -> +23480...
    if (cleaned.startsWith('0') && cleaned.length === 11) {
      return `+234${cleaned.substring(1)}`;
    }

    // Ensure it starts with '+'
    return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  }

  async join(dto: JoinWaitlistDto): Promise<WaitlistResponse> {
    this.logger.log(`Incoming waitlist request: ${dto.email}`);

    const existingEntry = await this.prisma.waitlist.findUnique({
      where: { email: dto.email },
    });

    if (existingEntry) {
      this.logger.warn(`Duplicate signup attempt: ${dto.email}`);
      throw new ConflictException('This email is already on the waitlist.');
    }

    try {
      const entry = await this.prisma.waitlist.create({
        data: dto,
      });
      this.logger.log(`Saved to Database: ID ${entry.id}`);

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const results = await Promise.allSettled([
        // Task A: Brevo Sync
        (async (): Promise<unknown> => {
          this.logger.log(`Attempting Brevo sync for ${dto.email}...`);

          const formattedPhone = this.formatPhoneNumber(dto.phone);

          const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': process.env.BREVO_API_KEY || '',
            },
            body: JSON.stringify({
              email: dto.email,
              attributes: {
                FIRSTNAME: dto.firstName,
                LASTNAME: dto.lastName,
                SMS: formattedPhone, // Must be E.164 format (e.g., +234...)
              },
              listIds: [5],
              updateEnabled: true,
            }),
          });

          const data: unknown = await response.json();

          if (!response.ok) {
            this.logger.error(`Brevo Sync Failed! Status: ${response.status}`);
            this.logger.error(`Brevo Error Details: ${JSON.stringify(data)}`);
            throw new Error(`Brevo API returned ${response.status}`);
          }

          this.logger.log(`Brevo Sync Success for ${dto.email}`);
          return data;
        })(),

        // Task B: Admin Notification Email
        transporter
          .sendMail({
            from: `"Aqwaya System" <${process.env.GMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: '🚀 New Waitlist Signup - Aqwaya',
            html: this.getAdminEmailHtml(dto),
          })
          .then((info) => {
            this.logger.log(`Admin Email Sent: ${info.messageId}`);
            return info;
          }),
      ]);

      results.forEach((res, i) => {
        if (res.status === 'rejected') {
          this.logger.error(
            `Parallel Task ${i === 0 ? 'Brevo' : 'Email'} failed:`,
            res.reason,
          );
        }
      });

      return {
        success: true,
        message: 'Welcome to Aqwaya!',
        id: entry.id,
      };
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email is already on the waitlist.');
        }
      }

      if (error instanceof Error) {
        this.logger.error('Critical Waitlist Error:', error.stack);
      } else {
        this.logger.error('Critical Waitlist Error:', error);
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred. Please try again.',
      );
    }
  }

  private getAdminEmailHtml(dto: JoinWaitlistDto): string {
    return `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333;">New Signup Alert</h2>
        <p><strong>Name:</strong> ${dto.firstName} ${dto.lastName}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>Phone:</strong> ${dto.phone || 'N/A'}</p>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">Source: Production AWS RDS</p>
      </div>`;
  }
}
