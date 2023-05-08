import { MaxLength } from 'class-validator';
import { Account } from 'src/accounts/model/account.model';
import { CardDetails } from 'src/card_details/models/card_details.model';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class UserDetails {
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

  @typeorm.OneToOne(() => Account, (account) => account.userDetails)
  account: Account;

  @typeorm.OneToOne(
    () => CardDetails,
    (cardDetails) => cardDetails.userDetails,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @typeorm.JoinColumn()
  cardDetails: CardDetails;
  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;
}
