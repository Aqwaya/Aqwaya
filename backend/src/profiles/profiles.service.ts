// src/profiles/profiles.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    dto: CreateProfileDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    // Prevent already onboarded users from recreating profiles
    if (user?.isOnboarded) {
      throw new ConflictException('User is already onboarded');
    }

    const logoUrl = file ? `/uploads/logos/${file.filename}` : null;

    // Use an atomic transaction to guarantee both actions succeed or fail together
    return this.prisma.$transaction(async (tx) => {
      // 1. Persist business identity details onto the Profile table
      const profile = await tx.profile.create({
        data: {
          businessName: dto.businessName, // Maps perfectly to Prisma schema
          industry: dto.industry,
          website: dto.website,
          location: dto.location,
          description: dto.description,
          employees: dto.employees,
          brandColor: dto.brandColor,
          logoUrl,
          userId,
        },
      });

      // 2. Atomic security release mechanism: flips the flag on the User record
      await tx.user.update({
        where: { id: userId },
        data: { isOnboarded: true },
      });

      return profile;
    });
  }
}
