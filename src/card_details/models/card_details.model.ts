import { MaxLength } from 'class-validator';
import { UserDetails } from 'src/user_details/models/user_details.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CardDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: string;

  @Column()
  cvvNumber: number;

  @Column({ type: 'date' })
  expiryDate: string;

  @Column()
  @MaxLength(90)
  cardHolder: string;

  @OneToOne(() => UserDetails, (userDetails) => userDetails.cardDetails)
  userDetails: UserDetails;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
