/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { FinancialControll } from 'src/app/financial-control/entities/financial-controll.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ideal_goal')
export class IdealGoal {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the user real value',
  })
  @Column({
    name: 'financial_controll_id',
    type: 'int',
    unsigned: true,
    nullable: false,
  })
  financialControllId: number;

  @ManyToOne(() => FinancialControll, financialControll => financialControll.idealGoals)
  @JoinColumn({ name: 'financial_controll_id' })
  financialControll: FinancialControll;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the user goal',
  })
  @Column({ name: 'goal_name', type: 'varchar', nullable: false })
  goalName: string;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the total value of the users goal',
  })
  @Column({ name: 'total_value', type: 'double', nullable: false })
  totalValue: number;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the monthly value of the users goal',
  })
  @Column({ name: 'monthly_value', type: 'double', nullable: true })
  monthlyValue?: number;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the start date for achieving the users goal',
  })
  @Column({ name: 'start_date', type: 'date', nullable: true })
  startDate: Date;

  @ApiProperty({
    nullable: true,
    description: 'Field containing the forecast for the end date',
  })
  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: Date;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', onUpdate: 'now()', nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  setStartDate() {
    if (!this.startDate) {
      this.startDate = new Date();
    }
  }
}
