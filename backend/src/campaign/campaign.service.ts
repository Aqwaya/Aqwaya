import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ChatService } from '../chat/chat.service'; 
import { CreateMessageDto } from '../chat/dto/create-message.dto';

@Injectable()
export class CampaignService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService, 
  ) {}

  async create(createCampaignDto: CreateCampaignDto, userId: string) {
    return this.prisma.campaign.create({
      data: {
        name: createCampaignDto.name,
        userId: userId, // 🔒 Explicit context binding prevents payload parameter spoofing
        status: 'DRAFT',
        details: {},
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.campaign.findMany({
      where: { userId }, // 🔒 Tenant Isolation: Strict boundary constraint
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // 🔒 Defends against Broken Object Level Authorization (BOLA / IDOR)
    if (campaign.userId !== userId) {
      throw new ForbiddenException('You do not have permission to access this campaign');
    }

    return campaign;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // 🔒 Re-use strict tenant evaluation block before running delete changes
    return this.prisma.campaign.delete({
      where: { id },
    });
  }

  async findMessages(campaignId: string, userId: string) {
    await this.findOne(campaignId, userId); // 🔒 Blocks viewing chat logs belonging to other users' entities
    return this.chatService.getChatHistory(campaignId);
  }

  async createMessage(campaignId: string, createMessageDto: CreateMessageDto, userId: string) {
    await this.findOne(campaignId, userId); // 🔒 Validates session authorization before accepting incoming chat streams
    return this.chatService.saveMessage({
      campaignId,
      content: createMessageDto.content,
    });
  }
}