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
import { ScheduleEvent } from '../models/schedule_event.model';
import { ScheduleEventService } from '../services/schedule_event.service';

@ApiTags('schedule-event')
@Controller('schedule-event')
export class ScheduleEventController {
  constructor(private scheduleEventService: ScheduleEventService) {}
  @Get()
  @ApiNotFoundResponse({
    description: 'Schedule event not found.',
  })
  @ApiOkResponse({
    type: ScheduleEvent,
    description: 'Return Schedule event.',
  })
  @Secured()
  async get(): Promise<ScheduleEvent[]> {
    return await this.scheduleEventService.get();
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Schedule event added successfully',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  @Secured()
  async add(@Body() scheduleEventName: string): Promise<ScheduleEvent> {
    return await this.scheduleEventService.add(scheduleEventName);
  }
}
