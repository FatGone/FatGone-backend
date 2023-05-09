import { UserDetails } from 'src/user_details/models/user_details.model';
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

  @OneToOne(() => UserDetails, (userDetails) => userDetails.account, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  userDetails: UserDetails;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
