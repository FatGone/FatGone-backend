import { MaxLength } from 'class-validator';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;

  @Column()
  lastCardDigits: number;

  @Column({ default: 'Obciążenie karty' })
  @MaxLength(255)
  title: string;

  @CreateDateColumn()
  date: string;

  @ManyToOne(
    () => AccountDetails,
    (accountDetails) => accountDetails.transactions,
  )
  account_details: AccountDetails;
}
