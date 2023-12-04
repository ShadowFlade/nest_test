import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class createUserDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  role: string;

}
