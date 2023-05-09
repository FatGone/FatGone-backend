import { MaxLength } from 'class-validator';
import { Account } from 'src/accounts/model/account.model';
import { Card } from 'src/card/models/card.model';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class AccountDetails {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  @MaxLength(45)
  firstName: string;

  @typeorm.Column()
  @MaxLength(45)
  lastName: string;

  @typeorm.Column()
  phoneNumber: string;

  @typeorm.Column()
  address: string;

  @typeorm.Column()
  city: string;

  @typeorm.Column()
  postCode: string;

  @typeorm.OneToOne(() => Account, (account) => account.accountDetails)
  account: Account;

  @typeorm.OneToOne(() => Card, (card) => card.accountDetails, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @typeorm.JoinColumn()
  card: Card;
  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;
}
