import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  role: string;
}
