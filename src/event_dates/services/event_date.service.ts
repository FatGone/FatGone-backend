import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDate } from '../models/event_date.model';
import { EventDateDto } from '../models/event_date.dto';

@Injectable()
export class EventDateService {
  constructor(
    @InjectRepository(EventDate)
    private readonly eventDateRepository: Repository<EventDate>,
  ) { }
  async get(): Promise<EventDate[]> {
    return await this.eventDateRepository.find();
  }
  async add(eventDateDto: EventDateDto): Promise<EventDate> {
    const eventDate = new EventDate();
    eventDate.date = eventDateDto.date;
    eventDate.endRepeatDate = eventDateDto.endRepeatDate;
    // eventDate.scheduleEvent = FIND IT LEL;
    // eventDate.eventPeriod = NIE MA JESZCZE, lel ;
    return await this.eventDateRepository.save(eventDate);
  }
}
