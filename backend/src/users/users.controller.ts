import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiOkResponse, 
  ApiCreatedResponse, 
  ApiUnauthorizedResponse, 
  ApiForbiddenResponse, 
  ApiBearerAuth 
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Provision a new user account (Superadmin)' })
  @ApiCreatedResponse({ description: 'Account provisioned by administrative action.' })
  @ApiForbiddenResponse({ description: 'Permission denied: Administrator role required.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all registered users in the platform' })
  @ApiOkResponse({ description: 'Complete user directory returned.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a specific user by record ID' })
  @ApiOkResponse({ description: 'User object returned.' })
  @ApiForbiddenResponse({ description: 'Access denied: You cannot view other users records.' })
  async findOne(@Param('id') id: string, @GetUser() currentUser: any) {
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only access your own profile');
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update personal or account metadata' })
  @ApiOkResponse({ description: 'User record updated successfully.' })
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @GetUser() currentUser: any
  ) {
    if (currentUser.role !== Role.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Purge a user account from the system' })
  @ApiOkResponse({ description: 'User account permanently removed.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}