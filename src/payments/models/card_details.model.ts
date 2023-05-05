import { IsInt, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CardDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  cardNumber: number;

  @Column()
  @IsInt()
  cvvNumber: number;

  @Column({ type: 'date' })
  expiryDate: string;

  @Column()
  @MaxLength(90)
  cardHolder: string;
}
