import { ApiProperty } from '@nestjs/swagger';
export class CreateRealGoalDto {
  @ApiProperty({
    description: 'Field containing the data of register.',
  })
  date?: Date;

  @ApiProperty({
    description: 'Field containing the real value added by the user.',
  })
  addedValue: number;

  @ApiProperty({
    description: 'Field containing the ideal goal id.',
  })
  idealGoalId: number;
}
