import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Inquiry about services', required: false })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'Hello, I would like to know more about Aqwaya.' })
  @IsString()
  @IsNotEmpty()
  message: string;
}