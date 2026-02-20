import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnboardingGuard } from '../auth/guards/onboarding.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { DashboardSummaryDto } from './dto/dashboard-summary.dto';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OnboardingGuard)
@Controller({ path: 'dashboard', version: '1' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get aggregated statistics for the dashboard view' })
  @ApiResponse({ status: 200, type: DashboardSummaryDto })
  async getSummary(@GetUser('id') userId: string): Promise<DashboardSummaryDto> {
    return this.dashboardService.getSummary(userId);
  }
}