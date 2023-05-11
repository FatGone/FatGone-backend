import { ApiProperty } from '@nestjs/swagger';

export class jwtTokenDTO {
  constructor(accessToken: string) {
    this.access_token = accessToken;
  }

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_at: Date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}
