import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageRole } from '@prisma/client';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { campaignId: string },
  ) {
    const history = await this.chatService.getChatHistory(data.campaignId);
    client.emit('chatHistory', history);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatDto,
  ) {
    // 1. Save User Message & Update Campaign state if action exists
    const userMsg = await this.chatService.saveMessage(payload);

    client.emit('messageReceived', { 
      messageId: userMsg.id, 
      status: 'saved' 
    });

    // 2. Get latest campaign details for AI context
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });

    if (!campaign) {
      client.emit('error', { message: 'Campaign not found' });
      return;
    }

    // 3. Get Mock AI Response based on updated state
    const aiResult = await this.aiService.getMockResponse(
      payload.content || '', 
      campaign.details
    );

    // 4. Save AI Response to Database
    const aiMsg = await this.prisma.chatMessage.create({
      data: {
        campaignId: payload.campaignId,
        content: aiResult.text,
        role: MessageRole.ASSISTANT,
        suggestions: aiResult.suggestions as any,
      },
    });

    // 5. Emit AI response to client
    client.emit('aiResponse', {
      messageId: aiMsg.id,
      text: aiMsg.content,
      suggestions: aiMsg.suggestions,
      timestamp: aiMsg.createdAt,
    });
  }
}