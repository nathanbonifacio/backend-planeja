import { ApiProperty } from '@nestjs/swagger';

export class CreateRealGoalDto {
  @ApiProperty({
    description: 'Field containg the data of register',
  })
  date?: Date;

  @ApiProperty({
    description: 'Field containg the ideal goal id.',
  })
  idealGoalId: number;
}
