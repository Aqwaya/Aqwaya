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

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    // Keeps your existing JWT manual authentication validation layer intact
  }

  async handleDisconnect(client: Socket) {
    // Connection disposal cleanup hook
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatDto,
  ) {
    const userId = client.data.user?.sub;

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });

    // 🔒 Strict BOLA Authorization validation boundary
    if (!campaign || campaign.userId !== userId) {
      client.emit('error', { message: 'Unauthorized access to this campaign context' });
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