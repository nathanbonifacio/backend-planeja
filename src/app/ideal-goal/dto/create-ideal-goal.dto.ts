/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CreateRealGoalDto } from 'src/app/real-goal/dto/create-real-goal.dto';

export class CreateIdealGoalDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the user real value',
  })
  financialControllId: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the user goal',
  })
  goalName: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the total value of the users goal',
  })
  totalValue: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the monthly value of the users goal',
  })
  monthlyValue?: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the date registration of a goal',
  })
  startDate?: Date;

  @ApiProperty({
    required: true,
    description: 'Field containing the forecast for the end date',
  })
  endDate?: Date;

  realGoal: CreateRealGoalDto[];
}
