import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ChatService } from '../chat/chat.service';
import { CreateMessageDto } from '../chat/dto/create-message.dto';
import { AiService } from '../ai/ai.service';
import { Campaign, CampaignStatus, Prisma } from '@prisma/client';

export interface CampaignProfileDetails {
  owner_name?: string;
  name?: string;
  business_name?: string;
  industry?: string;
  website_url?: string;
  prompt?: string;
  strategy?: unknown;
  assets?: unknown;
  [key: string]: unknown;
}

@Injectable()
export class CampaignService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatService: ChatService,
    private readonly aiService: AiService,
  ) {}

  async create(
    createCampaignDto: CreateCampaignDto,
    userId: string,
  ): Promise<Campaign> {
    return this.prisma.campaign.create({
      data: {
        name: createCampaignDto.name,
        userId: userId,
        status: CampaignStatus.IN_PROGRESS, // 🚀 Initial state: IN_PROGRESS
        details: {},
      },
    });
  }

  async findAll(userId: string): Promise<Campaign[]> {
    return this.prisma.campaign.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string): Promise<Campaign> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this campaign',
      );
    }

    return campaign;
  }

  async remove(id: string, userId: string): Promise<Campaign> {
    await this.findOne(id, userId);
    return this.prisma.campaign.delete({
      where: { id },
    });
  }

  async findMessages(campaignId: string, userId: string): Promise<unknown> {
    await this.findOne(campaignId, userId);
    return this.chatService.getChatHistory(campaignId);
  }

  async createMessage(
    campaignId: string,
    createMessageDto: CreateMessageDto,
    userId: string,
  ): Promise<unknown> {
    await this.findOne(campaignId, userId);

    return this.chatService.processMessageCycle({
      campaignId,
      content: createMessageDto.content,
    });
  }

  /**
   * Orchestrates the final campaign parallel copy construction pipeline
   */
  async compileFinalCampaignAssets(
    id: string,
    userId: string,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id, userId);

    // 1. Mark status as GENERATING while parallel agents execute
    await this.prisma.campaign.update({
      where: { id },
      data: { status: CampaignStatus.GENERATING },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const currentProfile = (campaign.details as CampaignProfileDetails) || {};

    const ownerName = user
      ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
      : 'Business Owner';

    const generationPayload = {
      owner_name: currentProfile.owner_name || ownerName || 'Business Owner',
      business_name:
        currentProfile.name || currentProfile.business_name || 'My Business',
      industry: currentProfile.industry || 'General Marketplace',
      website_url: currentProfile.website_url || '',
      prompt:
        currentProfile.prompt ||
        campaign.name ||
        'Generate marketing strategy text',
    };

    const executionResults =
      await this.aiService.generateCampaignAssets(generationPayload);

    const updatedDetails: CampaignProfileDetails = {
      ...currentProfile,
      strategy: executionResults.strategy,
      assets: executionResults.assets,
    };

    // 2. Mark status as READY when execution finishes successfully
    return this.prisma.campaign.update({
      where: { id },
      data: {
        status: CampaignStatus.READY,
        details: updatedDetails as unknown as Prisma.InputJsonValue,
      },
    });
  }
}