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
import { UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { MessageRole } from '@prisma/client';
import { JwtService } from '@nestjs/jwt'; // 🔒 Injected to verify tokens manually

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server; // '!' handles strictPropertyInitialization checks cleanly

  constructor(
    private readonly chatService: ChatService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // 🔒 Inject JwtService
  ) {}

  /**
   * 🔒 Intercepts incoming WebSocket connection handshakes.
   * If the JWT token is missing or cryptographically invalid, the client is dropped instantly.
   */
  async handleConnection(client: Socket) {
    try {
      // Look for token in connection handshake configuration auth payload or headers
      const authHeader = client.handshake.auth?.token || client.handshake.headers?.authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException('Missing authentication token');
      }

      const token = authHeader.replace('Bearer ', '');
      
      // Cryptographically verify token signature against your backend secret
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'fallback_secret',
      });

      // Safely store user profile information in the isolated socket instance state
      client.data.user = decoded;
      console.log(`Secure WS Client connected: ${client.id} (User: ${decoded.sub})`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.log(`Connection rejected for client ${client.id}: ${errorMessage}`);
      
      client.emit('error', { message: 'Unauthorized connection' });
      client.disconnect(true); // 🔒 Terminate the socket connection link immediately
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  /**
   * 🔒 Multi-Tenant History Fetch Protection
   */
  @SubscribeMessage('getHistory')
  async handleGetHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { campaignId: string },
  ) {
    const userId = client.data.user?.sub; // Extracted from verified connection data
    
    const campaign = await this.prisma.campaign.findUnique({ 
      where: { id: data.campaignId } 
    });
    
    // Check campaign existence and enforce user ownership bounds
    if (!campaign || campaign.userId !== userId) {
      client.emit('error', { message: 'Unauthorized access to this campaign' });
      return;
    }

    const history = await this.chatService.getChatHistory(data.campaignId);
    client.emit('chatHistory', history);
  }

  /**
   * 🔒 Multi-Tenant Messaging & AI Generation Protection
   */
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateChatDto,
  ) {
    const userId = client.data.user?.sub; // Extracted from verified connection data
    
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: payload.campaignId },
    });

    // Block cross-tenant access and unauthorized AI token exhaustion
    if (!campaign || campaign.userId !== userId) {
      client.emit('error', { message: 'Unauthorized access to this campaign' });
      return;
    }

    // Save human user message & process structured campaign states
    const userMsg = await this.chatService.saveMessage(payload);

    client.emit('messageReceived', { 
      messageId: userMsg.id, 
      status: 'saved' 
    });

    // Query core AI metrics engine safely
    const aiResult = await this.aiService.getMockResponse(
      payload.content || '', 
      campaign.details
    );

    // Persist structural assistant payload
    const aiMsg = await this.prisma.chatMessage.create({
      data: {
        campaignId: payload.campaignId,
        content: aiResult.text,
        role: MessageRole.ASSISTANT,
        suggestions: aiResult.suggestions || [],
      },
    });

    // Push response back securely to the confirmed tenant client socket
    client.emit('message', aiMsg);
  }
}