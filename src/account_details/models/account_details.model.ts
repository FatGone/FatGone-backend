import { Account } from 'src/accounts/model/account.model';
import { Card } from 'src/card/models/card.model';
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
  city: string;

  @typeorm.Column()
  postCode: string;

  @typeorm.Column()
  street: string;

  @typeorm.Column()
  streetNumber: string;

  @typeorm.Column()
  flatNumber: string;

  @typeorm.Column()
  membershipTypeId: number;

  @typeorm.OneToOne(() => Account, (account) => account.accountDetails)
  account: Account;

  @typeorm.OneToOne(() => Card, (card) => card.accountDetails, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @typeorm.JoinColumn()
  card: Card;
  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;
}
