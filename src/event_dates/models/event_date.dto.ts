import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class EventDateDto {
  @ApiProperty()
  @IsDateString()
  date: string;
  @ApiProperty()
  @IsDateString()
  endRepeatDate: string;
  @ApiProperty()
  @IsNumber()
  eventPeriodId: number;
}
