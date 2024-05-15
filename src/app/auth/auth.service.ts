import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(authLoginDto: AuthLoginDto) {
    const existingUser = await this.userService._getByParams({
      email: authLoginDto.email,
    });

    const existingPassword = await this.userService._getByParams({
      password: authLoginDto.password,
    });
    if (!existingPassword || !existingUser) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    const email = existingUser.email;
    const password = existingPassword.password;

    return { email, password };
  }
}
