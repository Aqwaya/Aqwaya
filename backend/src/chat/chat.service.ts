import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageRole, Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(payload: CreateChatDto) {
    if (payload.action) {
      await this.updateCampaignState(payload.campaignId, payload.action);
    }

    return this.prisma.chatMessage.create({
      data: {
        campaignId: payload.campaignId,
        content: payload.content || `Selected: ${payload.action?.type}`,
        role: MessageRole.USER,
        suggestions: payload.action ? [payload.action] : [],
      },
    });
  }

  // REHYDRATE FUNCTION: Fetches history ordered by creation date
  async getChatHistory(campaignId: string) {
    const history = await this.prisma.chatMessage.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'asc' },
    });
    return history;
  }

  private async updateCampaignState(campaignId: string, action: any) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { details: true },
    });

    if (!campaign) throw new NotFoundException('Campaign not found');

    const currentDetails = (campaign.details as Prisma.JsonObject) || {};
    
    const updatedDetails = {
      ...currentDetails,
      [action.type]: action.value,
    };

    return this.prisma.campaign.update({
      where: { id: campaignId },
      data: { details: updatedDetails },
    });
  }
}