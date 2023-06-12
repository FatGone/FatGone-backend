import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MembershipType } from './membership_type.model';
import { AccountDetails } from 'src/account_details/models/account_details.model';

@Entity()
export class ClientMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  freezed: boolean;

  @Column()
  joinedAt: string;

  @Column()
  nextPayment: string;

  @Column()
  price: number;

  @OneToOne(
    () => AccountDetails,
    (accountDetails) => accountDetails.clientMembership,
  )
  accountDetails: AccountDetails;

  @OneToOne(
    () => MembershipType,
    (membershipType) => membershipType.clientMembership,
    {
      cascade: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn()
  membershipType: MembershipType;
}
