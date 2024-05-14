import { ApiProperty } from '@nestjs/swagger';

export class CreateFinancialControllDto {
  // @ApiProperty({
  //   required: true,
  //   description: 'Field containing the user email.',
  // })
  // email: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the id of the user.',
  })
  userId: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the user income.',
  })
  income: number;

  @ApiProperty({
    required: false,
    description: 'Field containing the fixed expenses of the user.',
  })
  fixedExpenses?: number;

  @ApiProperty({
    required: false,
    description: 'Field containing the variable expenses of the user.',
  })
  variableExpenses?: number;
}
