import { Injectable, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class WaitlistService {
  private readonly logger = new Logger('WaitlistService');

  constructor(private prisma: PrismaService) {}

  async join(dto: JoinWaitlistDto) {
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
        // Task A: Brevo Sync with detailed response logging
        (async () => {
          this.logger.log(`Attempting Brevo sync for ${dto.email}...`);
          
          const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'api-key': process.env.BREVO_API_KEY || '',
            },
            body: JSON.stringify({
              email: dto.email,
              attributes: {
                FIRSTNAME: dto.firstName,
                LASTNAME: dto.lastName,
                SMS: dto.phone,
              },
              listIds: [5],
              updateEnabled: true,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            this.logger.error(`Brevo Sync Failed! Status: ${response.status}`);
            this.logger.error(`Brevo Error Details: ${JSON.stringify(data)}`);
            throw new Error(`Brevo API returned ${response.status}`);
          }

          this.logger.log(`Brevo Sync Success for ${dto.email}`);
          return data;
        })(),

        // Task B: Admin Notification Email
        transporter.sendMail({
          from: `"Aqwaya System" <${process.env.GMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: '🚀 New Waitlist Signup - Aqwaya',
          html: this.getAdminEmailHtml(dto),
        }).then(info => {
          this.logger.log(`Admin Email Sent: ${info.messageId}`);
          return info;
        }),
      ]);

      results.forEach((res, i) => {
        if (res.status === 'rejected') {
          this.logger.error(`Parallel Task ${i === 0 ? 'Brevo' : 'Email'} failed:`, res.reason);
        }
      });

      return { 
        success: true, 
        message: 'Welcome to Aqwaya!', 
        id: entry.id 
      };

    } catch (error: any) {
      this.logger.error('Critical Waitlist Error:', error.stack);
      
      if (error.code === 'P2002') {
        throw new ConflictException('This email is already on the waitlist.');
      }
      
      throw new InternalServerErrorException('An unexpected error occurred. Please try again.');
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