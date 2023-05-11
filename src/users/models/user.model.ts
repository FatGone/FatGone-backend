import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';
import * as typeorm from 'typeorm';

@typeorm.Entity()
export class User {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @typeorm.Column()
  @IsString()
  @MaxLength(45)
  firstName: string;

  @typeorm.Column()
  @IsString()
  @MaxLength(45)
  lastName: string;

  @typeorm.Column()
  @IsEmail()
  email: string;

  @typeorm.Column({ select: false })
  @IsString()
  @Length(6, 60)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one capital letter and one special character.',
  })
  password: string;

  @typeorm.Column()
  @IsString()
  phoneNumber: string;

  @typeorm.Column()
  @IsString()
  address: string;

  @typeorm.Column()
  @IsString()
  city: string;

  @typeorm.Column()
  @IsString()
  postCode: string;
  // @ManyToMany(() => Product, (product) => product.users)
  // @JoinTable({
  // name: 'favourites',
  // joinColumn: {
  // name: 'userId',
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
