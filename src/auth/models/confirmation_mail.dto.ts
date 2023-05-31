import { ApiProperty } from '@nestjs/swagger';

export class ConfirmationMailDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  membershipType: string;
}
