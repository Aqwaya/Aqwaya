import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiUnauthorizedResponse, 
  ApiConflictResponse, 
  ApiBearerAuth 
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiCreatedResponse({ description: 'User account created and onboarding initiated.' })
  @ApiConflictResponse({ description: 'Registration failed: Email address already in use.' })
  async register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return JWT' })
  @ApiOkResponse({ description: 'Login successful. Access token returned.' })
  @ApiUnauthorizedResponse({ description: 'Authentication failed: Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Retrieve authenticated user profile' })
  @ApiOkResponse({ description: 'Current user profile data returned.' })
  @ApiUnauthorizedResponse({ description: 'Access denied: Valid JWT token required.' })
  getMe(@GetUser() user: any) {
    return user;
  }
}