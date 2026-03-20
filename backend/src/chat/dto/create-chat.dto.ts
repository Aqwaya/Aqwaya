import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsObject } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ 
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', 
    description: 'The ID of the campaign session' 
  })
  @IsUUID()
  @IsNotEmpty()
  campaignId: string;

  @ApiProperty({ 
    example: 'I want to target Gen Z for a shoe sale', 
    description: 'The raw text typed by the user',
    required: false 
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ 
    example: { type: 'SET_BUDGET', value: 500 }, 
    description: 'The structured data from a clickable suggestion button',
    required: false 
  })
  @IsObject()
  @IsOptional()
  action?: {
    type: string;
    value: any;
  };
}