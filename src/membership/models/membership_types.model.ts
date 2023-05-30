import { IsBoolean, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MembershipType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(45)
  name: string;

  @Column()
  price: string;

  @Column()
  @IsBoolean()
  wellnessAccess: boolean;

  @Column()
  registrationFee: string;
}
