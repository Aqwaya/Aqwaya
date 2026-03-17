import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiTags, 
  ApiOperation, 
  ApiConsumes, 
  ApiBearerAuth, 
  ApiCreatedResponse, 
  ApiBadRequestResponse 
} from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Profiles')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'profiles', version: '1' })
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Setup business identity and brand assets' })
  @ApiCreatedResponse({ description: 'Business profile successfully updated and onboarded.' })
  @ApiBadRequestResponse({ description: 'Onboarding failed: Missing required business fields.' })
  @UseInterceptors(FileInterceptor('logo'))
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('id') userId: string,
  ) {
    return this.profilesService.create(userId, createProfileDto, file);
  }
}