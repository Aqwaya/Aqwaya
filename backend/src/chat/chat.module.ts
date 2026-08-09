import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { AiModule } from '../ai/ai.module';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'; // 🔒 Added for token verification utilities

@Module({
  imports: [
    AiModule,
    PrismaModule,
    JwtModule.register({
      // 🔒 Configure module to read your environment secrets
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
