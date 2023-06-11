import { ScheduleEvent } from 'src/schedule_events/models/schedule_event.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EventDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'date' })
  endRepeatDate: string;

  @ManyToOne(() => ScheduleEvent, (scheduleEvent) => scheduleEvent.id)
  scheduleEvent: ScheduleEvent;

  // @OneToMany(() => EventPeriod, (eventPeriod) => eventPeriod.id)
  // eventPeriod: EventPeriod;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
