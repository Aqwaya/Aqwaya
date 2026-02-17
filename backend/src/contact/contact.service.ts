import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ensure this path is correct
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {} // Inject Prisma

  async create(createContactDto: CreateContactDto) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // 1. Save to Database & execute external tasks concurrently
      const results = await Promise.allSettled([
        // Task 1: Save to Postgres (RDS)
        this.prisma.contactMessage.create({
          data: {
            name: createContactDto.name,
            email: createContactDto.email,
            subject: createContactDto.subject,
            message: createContactDto.message,
          },
        }),

        // Task 2: Sync with Brevo
        fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || '',
          },
          body: JSON.stringify({
            email: createContactDto.email,
            attributes: {
              FULLNAME: createContactDto.name,
              SUBJECT: createContactDto.subject,
              MESSAGE: createContactDto.message,
            },
            listIds: [7],
            updateEnabled: true,
          }),
        }),

        // Task 3: Notify Admin via Email
        transporter.sendMail({
          from: `"Aqwaya Contact" <${process.env.GMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact: ${createContactDto.subject || 'General Inquiry'}`,
          html: `<h3>New Message from ${createContactDto.name}</h3><p>${createContactDto.message}</p>`,
        }),
      ]);

      // Optional: Check for failures in non-critical tasks (Brevo/Email)
      results.forEach((res, i) => {
        if (res.status === 'rejected') console.error(`Task ${i} failed:`, res.reason);
      });

      return { success: true, message: 'Your message has been sent.' };
    } catch (error) {
      console.error('Contact error:', error);
      throw new InternalServerErrorException('Failed to process your request.');
    }
  }
}