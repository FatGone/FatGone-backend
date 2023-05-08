import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CardDetailsDto {
  @ApiProperty()
  @IsString()
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
