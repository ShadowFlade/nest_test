import { ApiProperty } from '@nestjs/swagger';

export class NewTokenDto {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;
}