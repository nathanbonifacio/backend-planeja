/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'creates a new user.' })
  @ApiCreatedResponse({
    type: CreateUserDto,
    description: 'Value returned whenever a user is created successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an user by its ID.' })
  @ApiOkResponse({
    type: UpdateUserDto,
    description: 'Value returned whenever a user is updated successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the user is trying to be updated does not exist.',
  })
  async updateUserById(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserById(userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an User by its ID.' })
  @ApiNoContentResponse({
    description: 'Value returned whenever a User is deleted successfully.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the User is trying to be deleted does not exist.',
  })
  deleteUserById(@Param('id') userId: number) {
    return this.userService.deleteUserById(userId);
  }
}
