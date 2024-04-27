/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        required: true,
        description: 'Field containing the first name of the user.'
    })
    name: string;

    @ApiProperty({
        required: true,
        example: 'teste@teste.com',
        description: 'Field containing the email of the user.'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        description: 'Field containing the birthdate of the user.'
    })
    birthdate: Date;

    @ApiProperty({
        required: true,
        description: 'Field containing the Whatsapp number of the user.'
    })
    whatsapp: number;
}
