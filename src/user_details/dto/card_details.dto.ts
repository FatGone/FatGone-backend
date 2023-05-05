import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength } from 'class-validator';

export class CardDetailsDto {
  @ApiProperty()
  @IsInt()
  cardNumber: number;

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
