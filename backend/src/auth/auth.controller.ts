import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';

export interface AuthResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiCreatedResponse({
    description: 'User account created and onboarding initiated.',
  })
  @ApiConflictResponse({
    description: 'Registration failed: Email address already in use.',
  })
  async register(@Body() registerDto: CreateUserDto): Promise<AuthResponse> {
    return (await this.authService.register(
      registerDto,
    )) as unknown as AuthResponse;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return JWT' })
  @ApiOkResponse({ description: 'Login successful. Access token returned.' })
  @ApiUnauthorizedResponse({
    description: 'Authentication failed: Invalid credentials.',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return (await this.authService.login(
      loginDto.email,
      loginDto.password,
    )) as unknown as AuthResponse;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retrieve authenticated user profile' })
  @ApiOkResponse({ description: 'Current user profile data returned.' })
  @ApiUnauthorizedResponse({
    description: 'Access denied: Valid JWT token required.',
  })
  getMe(@GetUser() user: Record<string, unknown>): Record<string, unknown> {
    return user;
  }
}
