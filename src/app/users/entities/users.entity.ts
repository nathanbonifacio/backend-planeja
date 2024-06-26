import { ApiProperty } from '@nestjs/swagger';
import { FinancialControll } from 'src/app/financial-control/entities/financial-controll.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @OneToMany(
    () => FinancialControll,
    (financialControll) => financialControll.userId,
  )
  financialControll: FinancialControll[];

  @ApiProperty({
    nullable: false,
    description: 'Field containing the first name of the user.',
  })
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the email of the user.',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the password of the user.',
  })
  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;
}
