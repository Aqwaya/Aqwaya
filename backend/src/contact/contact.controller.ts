import { Controller, Post, Body } from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiCreatedResponse, 
  ApiBadRequestResponse 
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a contact form message' })
  @ApiCreatedResponse({ description: 'Your inquiry has been sent to the Aqwaya support team.' })
  @ApiBadRequestResponse({ description: 'Submission failed: Please check the message format.' })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
}