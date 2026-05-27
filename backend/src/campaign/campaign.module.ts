import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { ChatModule } from '../chat/chat.module'; // Import ChatModule here

@Module({
  imports: [ChatModule], // Allows injection of ChatService
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}