/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the first name of the user.',
  })
  @Column({ name: 'name', type: 'varchar', length: 50 ,nullable: false })
  name: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the email of the user.',
  })
  @Column({ name: 'email', type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the password of the user.',
  })
  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the birthdate of the user.',
  })
  @Column({ name: 'birthdate', type: 'date', nullable: false })
  birthdate: Date;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the Whatsapp number of the user.',
  })
  @Column({ name: 'whatsapp', type: 'varchar', unique: true, nullable: false })
  whatsapp: string;
}
