import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import * as classValidator from 'class-validator';

export class UserDto {
  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(45)
  firstName: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(45)
  lastName: string;

  @ApiProperty()
  @classValidator.IsEmail()
  @classValidator.MaxLength(45)
  email: string;

  @ApiProperty()
  @classValidator.IsOptional()
  @classValidator.IsString()
  @classValidator.Length(6, 60)
  @classValidator.Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message:
        'Password should contain at least one capital letter and one special character.',
    },
  )
  password: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(20)
  phoneNumber: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(60)
  address: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(45)
  city: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(20)
  postCode: string;
}
