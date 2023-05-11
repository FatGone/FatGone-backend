import { MaxLength } from 'class-validator';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Card {
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

  @OneToOne(() => AccountDetails, (accountDetails) => accountDetails.card)
  accountDetails: AccountDetails;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
