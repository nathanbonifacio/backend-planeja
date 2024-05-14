import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { IdealGoalService } from './ideal-goal.service';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateIdealGoalDto } from './dto/create-ideal-goal.dto';
import { UpdateIdealGoalDto } from './dto/update-ideal-goal.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Controller('ideal-goal')
export class IdealGoalController {
  constructor(private readonly idealGoalService: IdealGoalService) {}

  @Post()
  @ApiOperation({ summary: 'creates a new ideal goal of the user.' })
  @ApiCreatedResponse({
    type: CreateUserDto,
    description:
      'Value returned whenever a ideal goal of the user is created successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  async createIdealGoal(
    @Body() createIdealGoalDto: CreateIdealGoalDto,
  ): Promise<CreateIdealGoalDto> {
    return this.idealGoalService.createIdealGoal(createIdealGoalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an ideal goal of the user by its ID.' })
  @ApiOkResponse({
    type: UpdateUserDto,
    description:
      'Value returned whenever a ideal goal of the user is updated successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the user is trying to be updated does not exist.',
  })
  async updateIdealGoalById(
    @Param('id') idealGoalId: number,
    @Body() updateIdealGoalDto: UpdateIdealGoalDto,
  ) {
    return this.idealGoalService.updateIdealGoalById(
      idealGoalId,
      updateIdealGoalDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an ideal goal of the user by its ID.' })
  @ApiNoContentResponse({
    description:
      'Value returned whenever a ideal goal of the user is deleted successfully.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the User is trying to be deleted does not exist.',
  })
  async deleteIdealGoalById(idealGoalId: number) {
    return this.idealGoalService.deleteIdealGoalById(idealGoalId);
  }
}
