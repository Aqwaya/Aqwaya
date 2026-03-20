import { Controller, Post, Body } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiCreatedResponse, 
  ApiBadRequestResponse, 
  ApiConflictResponse 
} from '@nestjs/swagger';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDto } from './dto/join-waitlist.dto';

@ApiTags('Waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  @ApiOperation({ summary: 'Register for early platform access' })
  @ApiCreatedResponse({ description: 'Successfully added to the Aqwaya early access queue.' })
  @ApiBadRequestResponse({ description: 'Invalid data: Please check email and phone format.' })
  @ApiConflictResponse({ description: 'Duplicate entry: This email is already on our list.' })
  async joinWaitlist(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.join(dto);
  }
}