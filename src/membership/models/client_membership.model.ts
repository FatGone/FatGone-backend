import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ default: null })
  remainingDays: number | null;

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

  @ManyToOne(() => MembershipType)
  membershipType: MembershipType;
}
