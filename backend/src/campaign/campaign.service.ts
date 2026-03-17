import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async create(createCampaignDto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        name: createCampaignDto.name,
        userId: createCampaignDto.userId,
        status: 'DRAFT',
        details: {}, // Initializing with empty state
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.campaign.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }
}