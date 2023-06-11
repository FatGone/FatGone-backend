import { Body, Controller } from '@nestjs/common';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { EventDateService } from '../services/event_date.service';
import { EventDate } from '../models/event_date.model';
import { EventDateDto } from '../models/event_date.dto';

@ApiTags('event-date')
@Controller('event-date')
export class EventDateController {
  constructor(private eventDateService: EventDateService) {}
  @Get()
  @ApiNotFoundResponse({
    description: 'EventDate not found.',
  })
  @ApiOkResponse({
    type: EventDate,
    description: 'Return EventDate.',
  })
  @Secured()
  async get(): Promise<EventDate[]> {
    return await this.eventDateService.get();
  }
  @Post()
  @ApiCreatedResponse({
    description: 'EventDate added successfully',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  @Secured()
  async add(@Body() eventDateDto: EventDateDto): Promise<EventDate> {
    return await this.eventDateService.add(eventDateDto);
  }
}
