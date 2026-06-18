import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Delete, 
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiOkResponse, 
  ApiNotFoundResponse, 
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateMessageDto } from '../chat/dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnboardingGuard } from '../auth/guards/onboarding.guard'; // 🔒 Imported the missing onboarding restriction guard
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Campaigns')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, OnboardingGuard) // 🔒 Enforces BOTH valid authorization AND complete onboarding profile
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // 🔒 Strips out any unauthorized body elements
  @ApiOperation({ summary: 'Create a new AI campaign session' })
  @ApiCreatedResponse({ description: 'Campaign initialized successfully.' })
  @ApiForbiddenResponse({ description: 'Access Denied: Onboarding sequence incomplete.' })
  create(@Body() createCampaignDto: CreateCampaignDto, @GetUser('id') userId: string) {
    // Context isolation: We explicitly pass the extracted JWT token userId to the service tier
    return this.campaignService.create(createCampaignDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all campaigns belonging to the authenticated user' })
  @ApiOkResponse({ description: 'List of user campaigns retrieved successfully.' })
  findAll(@GetUser('id') userId: string) {
    return this.campaignService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details for a specific campaign session' })
  @ApiOkResponse({ description: 'Campaign details retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Campaign not found.' })
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.campaignService.findOne(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific campaign session' })
  @ApiOkResponse({ description: 'Campaign deleted successfully.' })
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.campaignService.remove(id, userId);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Load all message logs associated with a campaign' })
  @ApiOkResponse({ description: 'Campaign message history retrieved successfully.' })
  getMessages(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.campaignService.findMessages(id, userId);
  }

  @Post(':id/messages')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Post a new message prompt to a specific campaign session' })
  @ApiCreatedResponse({ description: 'Message processed and added to context logs.' })
  postMessage(
    @Param('id') id: string, 
    @Body() createMessageDto: CreateMessageDto, 
    @GetUser('id') userId: string
  ) {
    return this.campaignService.createMessage(id, createMessageDto, userId);
  }

  @Post(':id/generate')
  @ApiOperation({ summary: 'Trigger parallel multi-agent specialist asset copy generation' })
  @ApiCreatedResponse({ description: 'Campaign assets compiled and saved successfully.' })
  generateCampaign(
    @Param('id') id: string,
    @GetUser('id') userId: string
  ) {
    return this.campaignService.compileFinalCampaignAssets(id, userId);
  }
}