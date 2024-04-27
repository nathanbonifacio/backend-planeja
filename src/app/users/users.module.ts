/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
