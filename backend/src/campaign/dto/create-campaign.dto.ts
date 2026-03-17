import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Summer 2026 Sale', description: 'Internal name for the campaign' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', description: 'The UUID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}