import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class userDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  role: string;

  @ApiPropertyOptional()
  refreshToken: string;

  @ApiPropertyOptional()
  accessToken: string;

}
