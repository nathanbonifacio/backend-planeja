import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    description: 'Field containing the first name of the user.',
  })
  name?: string;

  @ApiProperty({
    required: false,
    description: 'Field containing the email of the user.',
  })
  email?: string;

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
  password?: string;
}
