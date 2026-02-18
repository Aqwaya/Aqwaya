import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@aqwaya.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;
}