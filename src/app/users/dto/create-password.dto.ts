/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class CreatePasswordDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the password of the user.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the password confirmation of the user.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  confirmPassword: string;
}
