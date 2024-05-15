import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { RealGoalService } from './real-goal.service';
import { CreateRealGoalDto } from './dto/create-real-goal.dto';
import { UpdateRealGoalDto } from './dto/update-real-goal.dto';

@Controller('real-goal')
export class RealGoalController {
  constructor(private readonly realGoalService: RealGoalService) {}

  @Post()
  @ApiOperation({ summary: 'creates a new real goal of the user.' })
  @ApiCreatedResponse({
    type: CreateRealGoalDto,
    description:
      'Value returned whenever a real goal of the user is created successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  async createRealGoal(
    @Body() createRealGoalDto: CreateRealGoalDto,
  ): Promise<CreateRealGoalDto> {
    return this.realGoalService.createRealGoal(createRealGoalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an real goal of the user by its ID.' })
  @ApiOkResponse({
    description:
      'Value returned whenever a real goal of the user is updated successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the user is trying to be updated does not exist.',
  })
  async updateRealGoal(
    @Param('id') realGoalId: number,
    @Body() updateRealGoalDto: UpdateRealGoalDto,
  ) {
    return this.realGoalService.updateRealGoal(realGoalId, updateRealGoalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an real goal of the user by its ID.' })
  @ApiNoContentResponse({
    description:
      'Value returned whenever a real goal of the user is deleted successfully.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the User is trying to be deleted does not exist.',
  })
  async deleteRealGoal(@Param('id') realGoalId: number) {
    return this.realGoalService.deleteRealGoal(realGoalId);
  }
}
