import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientMembership } from './client_membership.model';

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
  @OneToOne(
    () => ClientMembership,
    (clientMembership) => clientMembership.membershipType,
  )
  clientMembership: ClientMembership;
}
