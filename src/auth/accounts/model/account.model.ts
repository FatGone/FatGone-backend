import { IsEmail, MaxLength, IsString, Length, Matches } from 'class-validator';
import { UserDetails } from 'src/user_details/models/user_details.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @MaxLength(45)
  email: string;

  @Column()
  @IsString()
  @Length(6, 60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one capital letter and one special character.',
  })
  password: string;

  @Column({ nullable: true })
  @OneToOne(() => UserDetails, (userDetails) => userDetails.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'userDetails',
    joinColumn: {
      name: 'accountId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userDetailsId',
      referencedColumnName: 'id',
    },
  })
  userDetailsId: number;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
