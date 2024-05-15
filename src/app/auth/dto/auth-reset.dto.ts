import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class AuthResetDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the password of the user',
  })
  password: string;

  @IsJWT()
  token: string;
}
