import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ClubDto {
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  postCode: string;
}
