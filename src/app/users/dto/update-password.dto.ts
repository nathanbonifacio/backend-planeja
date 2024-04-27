/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { CreatePasswordDto } from "./create-password.dto";
import { IsStrongPassword } from "class-validator";

export class UpdatePasswordDto extends CreatePasswordDto {
    @ApiProperty({
        required: true,
        description: 'Field containing the current password of the user.'
    })
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    currentPassword: string;
}

