import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto, file?: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (user?.isOnboarded) {
      throw new ConflictException('User is already onboarded');
    }

    const logoUrl = file ? `/uploads/logos/${file.filename}` : null;

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          businessName: dto.businessName,
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

      await tx.user.update({
        where: { id: userId },
        data: { isOnboarded: true },
      });

      return profile;
    });
  }
}