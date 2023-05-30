import { Account } from 'src/accounts/model/account.model';
import { Card } from 'src/card/models/card.model';
import { Transaction } from 'src/transactions/models/transaction.model';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class AccountDetails {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  firstName: string;

  @typeorm.Column()
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
    onDelete: 'SET NULL',
  })
  @typeorm.JoinColumn()
  card: Card;

  @typeorm.OneToMany(
    () => Transaction,
    (transaction) => transaction.account_details,
  )
  transactions: Transaction[];

  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;
}
