import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class WaitlistService {
  constructor(private prisma: PrismaService) {}

  async join(dto: JoinWaitlistDto) {
    // 1. PRIMARY GUARD: Check for existing subscriber
    const existingEntry = await this.prisma.waitlist.findUnique({
      where: { email: dto.email },
    });

    if (existingEntry) {
      throw new ConflictException('This email is already on the waitlist.');
    }

    try {
      // 2. DATABASE PERSISTENCE: Save to AWS RDS first
      const entry = await this.prisma.waitlist.create({
        data: dto,
      });

      // 3. TRANSPORTER CONFIGURATION
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // 4. PARALLEL EXECUTION: Fire Brevo and Emails concurrently
      // Promise.allSettled ensures one failure doesn't kill the entire process
      const results = await Promise.allSettled([
        // Task A: Brevo Sync
        fetch('https://api.brevo.com/v3/contacts', {
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
              PHONE: dto.phone,
            },
            listIds: [5],
            updateEnabled: true,
          }),
        }),

        // Task B: Admin Notification Email
        transporter.sendMail({
          from: `"Aqwaya System" <${process.env.GMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: '🚀 New Waitlist Signup - Aqwaya',
          html: this.getAdminEmailHtml(dto),
        }),

        // Task C: Subscriber Confirmation Email
        transporter.sendMail({
          from: `"Aqwaya" <${process.env.GMAIL_USER}>`,
          to: dto.email,
          subject: "You're on the list! Welcome to Aqwaya",
          html: this.getSubscriberEmailHtml(dto.firstName),
        }),
      ]);

      // 5. POST-LOGGING: Log failures for internal tracking without blocking response
      results.forEach((res, i) => {
        if (res.status === 'rejected') {
          console.error(`External Service Error (Task ${i}):`, res.reason);
        }
      });

      return { 
        success: true, 
        message: 'Welcome to Aqwaya!', 
        id: entry.id 
      };

    } catch (error: any) {
      console.error('Waitlist Process Error:', error);
      
      // Secondary safety check for database race conditions
      if (error.code === 'P2002') {
        throw new ConflictException('This email is already on the waitlist.');
      }
      
      throw new InternalServerErrorException('An unexpected error occurred. Please try again.');
    }
  }

  // --- Helper Methods for Clean HTML Templates ---

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

  private getSubscriberEmailHtml(firstName: string): string {
    return `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; line-height: 1.6; color: #333;">
        <h2 style="color: #1a73e8;">Hello ${firstName},</h2>
        <p>Thanks for joining the <strong>Aqwaya</strong> waitlist! We're thrilled to have you with us.</p>
        <p>We'll notify you the moment we launch our services. Stay tuned!</p>
        <br />
        <p>Best regards,<br /><strong>The Aqwaya Team</strong></p>
      </div>`;
  }
}