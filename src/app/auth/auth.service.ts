/* eslint-disable prettier/prettier */
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

    authLoginDto.email === existingUser.email;
    authLoginDto.password === existingPassword.password;

    if (authLoginDto.email !== existingUser.email) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    if (authLoginDto.password !== existingPassword.password) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    const email = authLoginDto.email;
    const password = authLoginDto.password;

    return { email, password };
  }
}
