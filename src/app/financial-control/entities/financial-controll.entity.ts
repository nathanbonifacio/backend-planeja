import { ApiProperty } from '@nestjs/swagger';
import { IdealGoal } from 'src/app/ideal-goal/entities/ideal-goal.entity';
import { Inputs } from 'src/app/inputs/entities/inputs.entity';
import { User } from 'src/app/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('financial_controll')
export class FinancialControll {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the id of the user.',
  })
  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the user income.',
  })
  @Column({ name: 'income', type: 'double', nullable: false })
  income: number;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the variable expenses of the user.',
  })
  @Column({ name: 'expenses', type: 'double', nullable: false })
  expenses: number;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the variable expenses of the user.',
  })
  @Column({ name: 'description', type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the variable expenses of the user.',
  })
  @Column({ name: 'total', type: 'double', nullable: false })
  total: number;

  @OneToMany(() => IdealGoal, (idealGoal) => idealGoal.financialControll)
  idealGoals: IdealGoal[];

  @OneToMany(() => Inputs, (inputs) => inputs.financialControll)
  inputs: Inputs[];
}
