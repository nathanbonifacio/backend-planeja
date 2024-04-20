import { CreatePasswordDto } from "./create-password.dto";

export class UpdatePasswordDto extends CreatePasswordDto {
    currentPassword: string;
}

