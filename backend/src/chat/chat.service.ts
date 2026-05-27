import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageRole, Prisma } from '@prisma/client';
import { AiService } from '../ai/ai.service'; // Injecting AI service here for reusability

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService, // Moved from Gateway to Service layer
  ) {}

  // Existing WS method
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

  // HTTP Route iv: Rehydrates history ordered by creation date
  async getChatHistory(campaignId: string) {
    return this.prisma.chatMessage.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'asc' },
    });
  }

  // HTTP Route v: Core logic for handling HTTP-based user prompts and AI responses
  async processHttpMessage(campaignId: string, dto: CreateMessageDto) {
    // 1. Save User Message to database
    await this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: dto.content,
        role: MessageRole.USER,
        suggestions: [],
      },
    });

    // 2. Fetch campaign state to supply context to the AI engine
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');

    // 3. Call your explicit AI configuration service
    const aiResult = await this.aiService.getMockResponse(
      dto.content,
      campaign.details
    );

    // 4. Save AI generated conversation text logs
    return this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: aiResult.text,
        role: MessageRole.ASSISTANT,
        suggestions: aiResult.suggestions as any,
      },
    });
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