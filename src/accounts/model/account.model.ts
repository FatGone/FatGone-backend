import { AccountDetails } from 'src/account_details/models/account_details.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => AccountDetails, (accountDetails) => accountDetails.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  accountDetails: AccountDetails;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
