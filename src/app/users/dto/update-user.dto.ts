import { ApiProperty } from '@nestjs/swagger';

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
}
