import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JoinWaitlistDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'tester@aqwaya.com', description: 'Unique email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+2348000000000', required: false, description: 'Optional phone number' })
  @IsOptional()
  @IsString()
  phone?: string;
}