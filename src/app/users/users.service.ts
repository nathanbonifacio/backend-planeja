import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from 'src/base/base.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SchemaValidationException } from 'src/common/exceptions/schema-validation.exception';
import * as bcrypt from 'bcrypt';

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
      throw new SchemaValidationException('Email já cadastrado.');
    }

    const isStrongPassword = (createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      await bcrypt.genSalt(),
    ));
    if (!isStrongPassword) {
      throw new SchemaValidationException(
        'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.',
      );
    }

    if (
      !(await bcrypt.compare(createUserDto.confirmPassword, isStrongPassword))
    ) {
      throw new SchemaValidationException('As senhas não coincidem.');
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
      throw new SchemaValidationException('Usuário não encontrado.');
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

    const userUpdated = await this.usersRepository.update(userId, userToUpdate);

    return userUpdated;
  }

  async deleteUserById(userId: number) {
    const existingUser = await this._getByParams({
      id: userId,
    });
    if (!existingUser) {
      throw new SchemaValidationException('Usuário não encontrado.');
    }

    return this.usersRepository.delete(userId);
  }

  // private validatePasswordStrength(password: string): boolean {
  //   const passwordValidationRegex = new RegExp(
  //     '^(?=(.*[aA-zZ]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\\-_+.])).{8,}$',
  //   );

  //   return passwordValidationRegex.test(password);
  // }
}
