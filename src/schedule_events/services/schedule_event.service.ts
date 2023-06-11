import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEvent } from '../models/schedule_event.model';

@Injectable()
export class ScheduleEventService {
  constructor(
    @InjectRepository(ScheduleEvent)
    private readonly scheduleEventRepository: Repository<ScheduleEvent>,
  ) {}
  async get(): Promise<ScheduleEvent[]> {
    return await this.scheduleEventRepository.find();
  }
  async add(scheduleEventName: string): Promise<ScheduleEvent> {
    const scheduleEvent = new ScheduleEvent();
    scheduleEvent.name = scheduleEventName;

    return await this.scheduleEventRepository.save(scheduleEvent);
  }
}
