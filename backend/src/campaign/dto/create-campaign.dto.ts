import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    example: 'Summer 2026 Sale',
    description: 'Internal name for the campaign',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
