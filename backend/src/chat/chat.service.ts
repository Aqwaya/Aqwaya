import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import {
  MessageRole,
  Prisma,
  ChatMessage,
} from '@prisma/client';
import { AiService } from '../ai/ai.service';

export interface ProcessMessageCycleResult {
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
  readyToGenerate: boolean;
}

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  /**
   * Core processing loop handling conversational transactions uniformly across REST & WS layers
   */
  async processMessageCycle(
    payload: CreateChatDto,
  ): Promise<ProcessMessageCycleResult> {
    const { campaignId, content } = payload;

    // 1. Persist incoming human user text input
    const userMessage = await this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: content || 'Selected option',
        role: MessageRole.USER,
        suggestions: payload.action
          ? ([payload.action] as unknown as Prisma.InputJsonValue)
          : ([] as unknown as Prisma.InputJsonValue),
      },
    });

    // 2. Fetch the live AI Engine step response via execution context
    const engineResponse = await this.aiService.getChatResponse(
      campaignId,
      content || '',
    );

    // 3. Ensure campaign exists
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    // 4. Update campaign profile details if extracted during conversation step
    if (engineResponse.profile) {
      await this.prisma.campaign.update({
        where: { id: campaignId },
        data: {
          details: engineResponse.profile as Prisma.InputJsonObject,
        },
      });
    }

    // 5. Map simple suggestion strings into structured button payloads for the UI
    const mappedSuggestions = (engineResponse.suggestive_responses || []).map(
      (label: string) => ({
        label,
        action: 'TEXT_INPUT',
        value: label,
      }),
    );

    // 6. Persist the AI output as an assistant chat message record
    const assistantMessage = await this.prisma.chatMessage.create({
      data: {
        campaignId,
        content: engineResponse.bot_message || 'Processing completed.',
        role: MessageRole.ASSISTANT,
        suggestions: mappedSuggestions as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      userMessage,
      assistantMessage,
      readyToGenerate: engineResponse.ready_to_generate || false,
    };
  }

  async getChatHistory(campaignId: string): Promise<ChatMessage[]> {
    return this.prisma.chatMessage.findMany({
      where: { campaignId },
      orderBy: { createdAt: 'asc' },
    });
  }
}