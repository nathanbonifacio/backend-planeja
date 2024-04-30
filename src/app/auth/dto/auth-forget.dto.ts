/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class AuthForgetDto {
    @ApiProperty({
        required: true,
        description: 'Field containing the email of the user',
      })
      email: string;
    
}