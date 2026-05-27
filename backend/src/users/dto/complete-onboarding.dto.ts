import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CompleteOnboardingDto {
  @ApiProperty({ example: 'Acme Corp', description: 'The user organization or company name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  companyName!: string;

  @ApiProperty({ example: 'E-commerce & Retail', description: 'The target industry vertical' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  industry?: string;
}