import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageRole, Prisma, CampaignStatus } from '@prisma/client'; // 💡 Imported CampaignStatus enum type
import { AiService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  /**
   * Core processing loop handling conversational transactions uniformly across REST & WS layers
   */
  async processMessageCycle(payload: CreateChatDto) {
    const { campaignId, content } = payload;

    // 1. Persist incoming human user text input
    const userMessage = await this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: content || 'Selected option',
        role: MessageRole.USER,
        suggestions: payload.action ? [payload.action] : [],
      },
    });

    // 2. Fetch the live AI Engine step response via cookie-mapped execution context
    const engineResponse = await this.aiService.getChatResponse(campaignId, content || '');

    // 3. Extract profile states returned by Flask and persist directly inside campaign details JSON field
    if (engineResponse.profile) {
      await this.prisma.campaign.update({
        where: { id: campaignId },
        data: {
          details: engineResponse.profile as Prisma.InputJsonObject,
          // 💡 Fix: 'READY' doesn't exist on your schema enum. Keeping it as DRAFT during conversation mode.
          status: CampaignStatus.DRAFT, 
        },
      });
    }

    // 4. Map the simple text suggestion strings array into the structured interactive button payloads expected by the client UI
    const mappedSuggestions = (engineResponse.suggestive_responses || []).map((label: string) => ({
      label,
      action: 'TEXT_INPUT',
      value: label,
    }));

    // 5. Persist the AI output as a structural system message record
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: engineResponse.bot_message || 'Processing completed.',
        role: MessageRole.ASSISTANT,
        suggestions: mappedSuggestions,
      },
    });

    return {
      userMessage,
      assistantMessage,
      readyToGenerate: engineResponse.ready_to_generate || false,
    };
  }

  async getChatHistory(campaignId: string) {
    return this.prisma.chatMessage.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'asc' },
    });
  }
}