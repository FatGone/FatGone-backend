import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RemindPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  remindCode: number;

  @Column()
  expiryDate: string;

  @CreateDateColumn()
  created_at: Date;
}
