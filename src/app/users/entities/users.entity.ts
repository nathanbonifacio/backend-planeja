/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

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
    description: 'Field containing the password of the user.',
  })
  password: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the birthdate of the user.',
  })
  birthdate: Date;

  @ApiProperty({
    required: true,
    description: 'Field containing the Whatsapp number of the user.',
  })
  whatsapp: number;
}
