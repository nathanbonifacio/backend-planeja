import { ApiProperty } from '@nestjs/swagger';

export class CreateFinancialControllDto {
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
    description: 'Field containing the expenses of the user.',
  })
  expenses?: number;

  @ApiProperty({
    required: false,
    description: 'Field containing the description of the user.',
  })
  description: string;

  @ApiProperty({
    required: false,
    description: 'Field containing the total of the user.',
  })
  total: number;
}
