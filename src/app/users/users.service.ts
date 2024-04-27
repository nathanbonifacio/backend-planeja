/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from 'src/base/base.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const existingUser = await this._getByParams({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `O email ${createUserDto.email} já está cadastrado`,
      );
    }

    const userToCreate = {
      ...createUserDto,
    };

    const user = await this.usersRepository.save(userToCreate);

    return user;
  }

  async updateUserById(userId: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this._getByParams({
     id: userId,
    });
    if (!existingUser) {
      throw new BadRequestException(
        `O usuário ${userId} não está cadastrado.`,
      );
    }

    if (updateUserDto.email) {
      const userWithEmail = await this._getByParams({
        email: updateUserDto.email,
        id: Not(userId),
      });

      if (userWithEmail) {
        throw new BadRequestException(updateUserDto.email);
      }
    }

    const userToUpdate = {
      ...existingUser,
      ...updateUserDto,
    };

    const userUpdated = await this.usersRepository.update(
      userId,
      userToUpdate,
    );

    return userUpdated;
  }

  async deleteUserById(userId: number) {
    const existingUser = await this._getByParams({
      id: userId,
    });
    if (existingUser) {
      throw new BadRequestException(`O client ${userId} não foi encontrado.`);
    }

    return this.usersRepository.delete(userId);
  }

  
}
