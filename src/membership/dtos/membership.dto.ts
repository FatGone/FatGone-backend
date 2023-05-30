import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsBoolean, IsDecimal, IsInt } from 'class-validator';

export class MembershipDto {
  @ApiProperty()
  @IsInt()
  membershipTypeId: number;

  @ApiProperty()
  @IsBoolean()
  freezed: boolean;

  // @ApiProperty({ type: 'string', format: 'date' })
  // nextPayment?: string;

  @ApiProperty()
  @IsDecimal()
  price: string;
}
