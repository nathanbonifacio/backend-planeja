import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: `n%'QX]t|v_$!%iYUx:7^bN26tC"|*z:6`,
    }),
    UserModule,
    TypeOrmModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
