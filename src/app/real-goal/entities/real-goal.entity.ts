import { ApiProperty } from '@nestjs/swagger';
import { IdealGoal } from 'src/app/ideal-goal/entities/ideal-goal.entity';
import { Inputs } from 'src/app/inputs/entities/inputs.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('real_goal')
export class RealGoal {
  @ApiProperty({
    description: 'The primary column',
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiProperty({
    nullable: true,
    description: 'Field containg the data of register',
  })
  @Column({ name: 'date', type: 'date', nullable: true })
  date: Date;

  @ApiProperty({
    nullable: false,
    description: 'Field containing the real value added by the user.',
  })
  @Column({ name: 'added_value', type: 'double', nullable: false })
  addedValue: number;

  @ApiProperty({
    nullable: false,
    description: 'Field containg the ideal goal id.',
  })
  @Column({
    name: 'ideal_goal_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  idealGoalId: number;

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

  @ManyToOne(() => IdealGoal, (idealGoal) => idealGoal.realGoal)
  @JoinColumn({ name: 'ideal_goal_id' })
  idealGoal: IdealGoal;

  @OneToMany(() => Inputs, (inputs) => inputs.realGoal)
  inputs: Inputs[];

  @BeforeInsert()
  setStartDate() {
    if (!this.date) {
      this.date = new Date();
    }
  }
}
