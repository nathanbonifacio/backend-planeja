/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        required: false,
        description: 'Field containing the first name of the user.'
    })
    name?: string;

    @ApiProperty({
        required: false,
        description: 'Field containing the email of the user.'
    })
    email?: string;

    @ApiProperty({
        required: false,
        description: 'Field containing the birthdate of the user.'
    })
    birthdate?: Date;

    @ApiProperty({
        required: false,
        description: 'Field containing the Whatsapp number of the user.'
    })
    whatsapp?: string;
}
