import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventDate } from './models/event_date.model';
import { EventDateService } from './services/event_date.service';
import { EventDateController } from './controllers/event_date.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventDate])],
  providers: [EventDateService],
  controllers: [EventDateController],
  exports: [EventDateService],
})
export class EventDatesModule {}
