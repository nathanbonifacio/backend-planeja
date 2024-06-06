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

  async createToken() {}

  async checkToken() {}

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

    const email = authLoginDto.email;

    return { email };
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

  // async reset(reset: AuthResetDto, token: string) {
  //   await this.userService.update(reset,token);
  // }
}
