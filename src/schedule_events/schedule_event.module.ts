import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEvent } from './models/schedule_event.model';
import { ScheduleEventController } from './controllers/schedule_event.controller';
import { ScheduleEventService } from './services/schedule_event.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEvent])],
  providers: [ScheduleEventService],
  controllers: [ScheduleEventController],
  exports: [ScheduleEventService],
})
export class ScheduleEventModule {}
