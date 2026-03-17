import { IsString, IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'Aqwaya Tech' })
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsNotEmpty()
  industry: string;

  @ApiProperty({ example: 'https://aqwaya.com', required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'Lagos, Nigeria', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'SaaS Platform', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '11-50 employees', required: false })
  @IsString()
  @IsOptional()
  employees?: string;

  @ApiProperty({ example: '#3B82F6', required: false })
  @IsString()
  @IsHexColor()
  @IsOptional()
  brandColor?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  logo?: any;
}