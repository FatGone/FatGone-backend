import { MaxLength, Length, Matches } from 'class-validator';
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
  @MaxLength(45)
  email: string;

  @Column()
  @Length(6, 60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one capital letter and one special character.',
  })
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
