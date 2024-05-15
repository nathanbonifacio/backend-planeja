import { ApiProperty } from '@nestjs/swagger';
import { FinancialControll } from 'src/app/financial-control/entities/financial-controll.entity';
import { RealGoal } from 'src/app/real-goal/entities/real-goal.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('inputs')
export class Inputs {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({
    description: 'Field containg the data of register',
  })
  @Column({ name: 'date', type: 'date', nullable: true })
  date: Date;

  @ApiProperty({
    description: 'Field containg the balance of the user.',
  })
  @Column({ name: 'balance', type: 'double', nullable: true })
  balance: number;

  @ApiProperty({
    description: 'Field containg the observations of the user.',
  })
  @Column({ name: 'observations', type: 'text', nullable: true })
  observations: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the real goal id.',
  })
  @Column({
    name: 'real_goal_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  realGoalId: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the financial controll id.',
  })
  @Column({
    name: 'financial_controll_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  financialControllId: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'now()',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'now()',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => RealGoal, (realGoal) => realGoal.inputs)
  @JoinColumn({ name: 'real_goal_id' })
  realGoal: RealGoal;

  @ManyToOne(
    () => FinancialControll,
    (financialControll) => financialControll.inputs,
  )
  @JoinColumn({ name: 'financial_controll_id' })
  financialControll: FinancialControll;

  @BeforeInsert()
  setStartDate() {
    if (!this.date) {
      this.date = new Date();
    }
  }
}
