import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateMessageDto } from '../chat/dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnboardingGuard } from '../auth/guards/onboarding.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Campaign } from '@prisma/client';

@ApiTags('Campaigns')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new AI campaign session' })
  @ApiCreatedResponse({ description: 'Campaign initialized successfully.' })
  @ApiForbiddenResponse({
    description: 'Access Denied: Onboarding sequence incomplete.',
  })
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
    @GetUser('id') userId: string,
  ): Promise<Campaign> {
    return await this.campaignService.create(createCampaignDto, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all campaigns belonging to the authenticated user',
  })
  @ApiOkResponse({
    description: 'List of user campaigns retrieved successfully.',
  })
  async findAll(@GetUser('id') userId: string): Promise<Campaign[]> {
    return await this.campaignService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details for a specific campaign session' })
  @ApiOkResponse({ description: 'Campaign details retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Campaign not found.' })
  async findOne(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<Campaign> {
    return await this.campaignService.findOne(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific campaign session' })
  @ApiOkResponse({ description: 'Campaign deleted successfully.' })
  async remove(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<Campaign> {
    return await this.campaignService.remove(id, userId);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Load all message logs associated with a campaign' })
  @ApiOkResponse({
    description: 'Campaign message history retrieved successfully.',
  })
  async getMessages(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<unknown> {
    return await this.campaignService.findMessages(id, userId);
  }

  @Post(':id/messages')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({
    summary: 'Post a new message prompt to a specific campaign session',
  })
  @ApiCreatedResponse({
    description: 'Message processed and added to context logs.',
  })
  async postMessage(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto,
    @GetUser('id') userId: string,
  ): Promise<unknown> {
    return await this.campaignService.createMessage(
      id,
      createMessageDto,
      userId,
    );
  }

  @Post(':id/generate')
  @ApiOperation({
    summary: 'Trigger parallel multi-agent specialist asset copy generation',
  })
  @ApiCreatedResponse({
    description: 'Campaign assets compiled and saved successfully.',
  })
  async generateCampaign(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<Campaign> {
    return await this.campaignService.compileFinalCampaignAssets(id, userId);
  }
}
