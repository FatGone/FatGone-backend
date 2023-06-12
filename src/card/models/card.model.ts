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
import { CardDto } from '../dto/card.dto';
import { DateTime } from 'luxon';

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

  copyWithDto(cardDto: CardDto): Card {
    this.cardNumber = cardDto.cardNumber;
    this.cvvNumber = cardDto.cvvNumber;
    this.expiryDate = DateTime.fromISO(cardDto.expiryDate).toSQLDate();
    this.cardHolder = cardDto.cardHolder;
    return this;
  }
}
