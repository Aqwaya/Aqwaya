import { Controller, Get, UseGuards } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth, 
  ApiOkResponse, 
  ApiUnauthorizedResponse, 
  ApiForbiddenResponse 
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnboardingGuard } from '../auth/guards/onboarding.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { DashboardSummaryDto } from './dto/dashboard-summary.dto';

@ApiTags('Dashboard')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Fetch business analytics and campaign overview' })
  @ApiOkResponse({ description: 'Aggregated dashboard statistics returned.', type: DashboardSummaryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized: Session token missing or expired.' })
  @ApiForbiddenResponse({ description: 'Access denied: Onboarding must be completed first.' })
  async getSummary(@GetUser('id') userId: string): Promise<DashboardSummaryDto> {
    return this.dashboardService.getSummary(userId);
  }
}