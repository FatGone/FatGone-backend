import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @IsString()
  @Length(8, 19)
  cardNumber: string;

  @ApiProperty()
  cvvNumber: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  expiryDate: string;

  @ApiProperty()
  @IsString()
  @MaxLength(90)
  cardHolder: string;
}
