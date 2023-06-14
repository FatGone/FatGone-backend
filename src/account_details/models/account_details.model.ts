import { Account } from 'src/accounts/model/account.model';
import { Card } from 'src/card/models/card.model';
import { ClientMembership } from 'src/membership/models/client_membership.model';
import * as typeorm from 'typeorm';
import { AccountDetailsDto } from '../dto/account_details.dto';

@typeorm.Entity()
export class AccountDetails {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  firstName: string;

  @typeorm.Column()
  lastName: string;

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

  @typeorm.OneToOne(() => Account, (account) => account.accountDetails)
  account: Account;

  @typeorm.OneToOne(() => Card, (card) => card.accountDetails, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @typeorm.JoinColumn()
  card: Card | null;

  @typeorm.OneToOne(
    () => ClientMembership,
    (clientMembership) => clientMembership.accountDetails,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  @typeorm.JoinColumn()
  clientMembership: ClientMembership | null;

  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;

  copyWithDto(accountDetailsDto: AccountDetailsDto): AccountDetails {
    this.firstName = accountDetailsDto.firstName;
    this.lastName = accountDetailsDto.lastName;
    this.city = accountDetailsDto.city;
    this.postCode = accountDetailsDto.postCode;
    this.street = accountDetailsDto.street;
    this.streetNumber = accountDetailsDto.streetNumber;
    this.flatNumber = accountDetailsDto.flatNumber;
    return this;
  }
}
