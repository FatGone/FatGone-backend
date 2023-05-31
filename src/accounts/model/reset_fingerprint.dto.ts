import { ApiProperty } from '@nestjs/swagger';

export class ResetFingerprintDto {
  @ApiProperty()
  mail: string;
}
