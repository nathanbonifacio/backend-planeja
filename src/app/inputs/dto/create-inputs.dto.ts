import { ApiProperty } from '@nestjs/swagger';

export class CreateInputsDto {
  @ApiProperty({
    description: 'Field containg the data of register',
  })
  date?: Date;

  @ApiProperty({
    description: 'Field containg the balance of the user.',
  })
  balance: number;

  @ApiProperty({
    description: 'Field containg the observations of the user.',
  })
  observations?: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the real goal id.',
  })
  realGoalId: number;

  @ApiProperty({
    required: true,
    description: 'Field containing the financial controll id.',
  })
  financialControllId: number;
}
