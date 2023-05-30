import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsString, MaxLength } from 'class-validator';

export class TransactionDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsDecimal()
  price: string;

  @ApiProperty()
  @IsInt()
  lastCardDigits: number;
}
