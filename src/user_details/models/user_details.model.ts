import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CardDetails } from 'src/payments/models/card_details.model';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class UserDetails {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  @MaxLength(45)
  firstName: string;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  @MaxLength(45)
  lastName: string;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  address: string;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  city: string;

  @typeorm.Column()
  @IsOptional()
  @IsString()
  postCode: string;

  @typeorm.Column({ nullable: true })
  @typeorm.OneToOne(() => CardDetails, (cardDetails) => cardDetails.id, {
    onDelete: 'CASCADE',
  })
  @typeorm.JoinTable({
    name: 'cardDetails',
    joinColumn: {
      name: 'userDetailsId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cardDetailsId',
      referencedColumnName: 'id',
    },
  })
  cardDetailsId: number;
  // @ManyToMany(() => Product, (product) => product.users)
  // @JoinTable({
  // name: 'favourites',
  // joinColumn: {
  // name: 'accountId',
  // referencedColumnName: 'id',
  // },
  // inverseJoinColumn: {
  // name: 'productId',
  // referencedColumnName: 'id',
  // },
  // })
  // favourites: Product[];
  @typeorm.CreateDateColumn()
  created_at: Date;

  @typeorm.UpdateDateColumn()
  updated_at: Date;
}
