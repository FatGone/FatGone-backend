import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import * as classValidator from 'class-validator';

export class UserDetailsDto {
  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(45)
  firstName: string;

  @ApiProperty()
  @classValidator.IsString()
  @classValidator.MaxLength(45)
  lastName: string;

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