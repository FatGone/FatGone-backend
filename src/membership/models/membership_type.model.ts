import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MembershipType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'double' })
  price: number;

  @Column()
  wellnessAccess: boolean;

  @Column({ type: 'double' })
  registrationFee: number;
}
