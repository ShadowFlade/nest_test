import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;

}
