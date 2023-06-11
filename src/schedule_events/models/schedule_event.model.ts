import { AccountDetails } from 'src/account_details/models/account_details.model';
import { Club } from 'src/club/models/club.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ScheduleEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Club, (club) => club.id)
  club: Club;
  @JoinColumn()
  accountDetails: AccountDetails;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
