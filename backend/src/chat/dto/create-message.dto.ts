import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example: 'Generate a target audience list for an organic skincare line.',
    description: 'The message prompt sent to the AI',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
