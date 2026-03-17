import { ApiProperty } from '@nestjs/swagger';

export enum DashboardIcon {
  USERS = 'users',
  MAIL = 'mail',
  MESSAGE = 'message-square',
  DOLLAR = 'dollar-sign',
}

export class StatDto {
  @ApiProperty({ enum: DashboardIcon })
  icon: DashboardIcon;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  change: string;

  @ApiProperty()
  color: string;
}

export class DashboardSummaryDto {
  @ApiProperty({ type: [StatDto] })
  stats: StatDto[];

  @ApiProperty()
  userName: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty({ isArray: true, type: 'string', example: [] })
  recentCampaigns: any[];
}