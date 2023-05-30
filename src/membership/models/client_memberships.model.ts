import { IsBoolean, IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClientMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  membershipTypeId: number;

  @Column()
  @IsBoolean()
  freezed: boolean;

  @CreateDateColumn()
  joinedAt: Date;

  @Column()
  nextPayment: Date;

  @Column()
  price: string;
}
