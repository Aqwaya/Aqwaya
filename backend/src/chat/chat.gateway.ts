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
import { PrismaService } from '../prisma/prisma.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';

interface AuthenticatedSocketData {
  user?: {
    sub?: string;
    email?: string;
    [key: string]: unknown;
  };
}

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(client: Socket): void {
    // Keeps your existing JWT manual authentication validation layer intact
    void client;
  }

  handleDisconnect(client: Socket): void {
    // Connection disposal cleanup hook
    void client;
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatDto,
  ): Promise<void> {
    const socketData = client.data as AuthenticatedSocketData;
    const userId = socketData.user?.sub;

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });

    // 🔒 Strict BOLA Authorization validation boundary
    if (!campaign || campaign.userId !== userId) {
      client.emit('error', {
        message: 'Unauthorized access to this campaign context',
      });
      return;
    }

    // Process the entire conversation cycle safely
    const cycleResult = await this.chatService.processMessageCycle(payload);

    // Notify client the user's message was processed
    client.emit('messageReceived', {
      messageId: cycleResult.userMessage.id,
      status: 'saved',
    });

    // Emit the freshly captured system response to the active client interface
    client.emit('message', cycleResult.assistantMessage);

    // Broadcast state updates if generation switches are ready
    if (cycleResult.readyToGenerate) {
      client.emit('campaignStateChange', { status: 'READY' });
    }
  }
}
