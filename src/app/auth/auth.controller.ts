import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() login: AuthLoginDto) {
    return this.authService.login(login);
  }

  @Post('register')
  async register(@Body() register: AuthRegisterDto) {
    return this.userService.createUser(register);
  }

  @Post('forget')
  async forget(@Body() forget: AuthForgetDto) {
    return this.authService.forget(forget);
  }

  // @Post('reset')
  // async reset(@Body() reset: AuthResetDto) {}
}
