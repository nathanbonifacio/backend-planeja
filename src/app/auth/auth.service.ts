/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthForgetDto } from './dto/auth-forget.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const existingUser = await this.userService._getByParams({
      email: authLoginDto.email,
    });

    authLoginDto.email === existingUser.email;

    if (authLoginDto.email !== existingUser.email) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    if (!(await bcrypt.compare(authLoginDto.password, existingUser.password))) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    return existingUser;
  }

  async forget(forget: AuthForgetDto) {
    const existingUser = await this.userService._getByParams({
      email: forget.email,
    });
    if (!existingUser) {
      throw new UnauthorizedException('E-mail incorreto.');
    }

    return true;
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService._getByParams({ email: email });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
