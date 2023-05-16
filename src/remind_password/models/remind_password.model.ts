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
  userId: number;

  @Column()
  remindCode: number;

  @Column({ type: 'date' })
  expiryDate: string;

  @CreateDateColumn()
  created_at: Date;
}
