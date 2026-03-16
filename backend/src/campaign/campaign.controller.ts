import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiOkResponse, 
  ApiNotFoundResponse, 
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@ApiTags('Campaigns')
@ApiResponse({ status: 201, description: 'Campaign initialized successfully.' })
@ApiBearerAuth('access-token') // Links this controller to the security definition in main.ts
@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new AI campaign session',
    description: 'Initializes a campaign record with a default DRAFT status.' 
  })
  @ApiCreatedResponse({ 
    description: 'Campaign initialized successfully.',
    // type: CampaignEntity // If you have a Campaign entity class, link it here
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get campaign details and chat history',
    description: 'Returns the campaign metadata and all associated chat messages for rehydration.'
  })
  @ApiOkResponse({ 
    description: 'Campaign and message history retrieved successfully.',
    // type: CampaignWithMessagesDto // Define a DTO that includes messages
  })
  @ApiNotFoundResponse({ description: 'The campaign with the provided ID was not found.' })
  @ApiUnauthorizedResponse({ description: 'Authentication required.' })
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }
}