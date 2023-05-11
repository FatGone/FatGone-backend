import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, MaxLength } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @IsString()
  @Length(19, 19)
  cardNumber: string;

  @ApiProperty()
  @IsInt()
  cvvNumber: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  expiryDate: string;

  @ApiProperty()
  @IsString()
  @MaxLength(90)
  cardHolder: string;
}
