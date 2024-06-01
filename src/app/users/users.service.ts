import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseService } from 'src/base/base.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SchemaValidationException } from 'src/common/exceptions/schema-validation.exception';

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
      throw new SchemaValidationException(
        'validations.user.email-already-registered',
      );
    }

    const isStrongPassword = this.validatePasswordStrength(
      createUserDto.password,
    );
    if (!isStrongPassword) {
      throw new SchemaValidationException(
        'validations.password.not-strong-password',
      );
    }

    if (createUserDto.confirmPassword != createUserDto.password) {
      throw new SchemaValidationException('validations.password.dont-match');
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
      throw new SchemaValidationException('validations.user.user-not-found');
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
      throw new SchemaValidationException('validations.user.user-not-found');
    }

    return this.usersRepository.delete(userId);
  }

  private validatePasswordStrength(password: string): boolean {
    const passwordValidationRegex = new RegExp(
      '^(?=(.*[aA-zZ]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\\-_+.])).{8,}$',
    );

    return passwordValidationRegex.test(password);
  }
}
