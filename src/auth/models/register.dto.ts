import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import * as classValidator from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @classValidator.IsEmail()
  @classValidator.MaxLength(45)
  email: string;

  @ApiProperty()
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
  passwordConfirmation: string;
}
