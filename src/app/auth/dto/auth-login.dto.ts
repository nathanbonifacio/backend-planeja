/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the email of the user',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the password of the user',
  })
  password: string;
}