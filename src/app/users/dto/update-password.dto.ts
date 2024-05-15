import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the current password of the user.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  currentPassword: string;
}
