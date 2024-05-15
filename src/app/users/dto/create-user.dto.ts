import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the first name of the user.',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'teste@teste.com',
    description: 'Field containing the email of the user.',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the birthdate of the user.',
  })
  birthdate: Date;

  @ApiProperty({
    required: true,
    description: 'Field containing the Whatsapp number of the user.',
  })
  whatsapp: string;

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
