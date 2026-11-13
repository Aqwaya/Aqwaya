import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { ChatModule } from '../chat/chat.module'; // Import ChatModule here
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [ChatModule, AiModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
