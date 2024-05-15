import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { InputsService } from './inputs.service';
import { CreateInputsDto } from './dto/create-inputs.dto';
import { UpdateInputsDto } from './dto/update-inputs.dto';

@Controller('inputs')
export class InputsController {
  constructor(private readonly inputsService: InputsService) {}

  @Post()
  @ApiOperation({ summary: 'creates a new inputs of the user.' })
  @ApiCreatedResponse({
    type: CreateInputsDto,
    description:
      'Value returned whenever a inputs of the user is created successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  async createRealGoal(
    @Body() createInputsDto: CreateInputsDto,
  ): Promise<CreateInputsDto> {
    return this.inputsService.createInputs(createInputsDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an inputs of the user by its ID.' })
  @ApiOkResponse({
    description:
      'Value returned whenever a inputs of the user is updated successfully.',
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
    @Param('id') inputsId: number,
    @Body() updateInputsDto: UpdateInputsDto,
  ) {
    return this.inputsService.updateInputs(inputsId, updateInputsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an inputs of the user by its ID.' })
  @ApiNoContentResponse({
    description:
      'Value returned whenever a inputs of the user is deleted successfully.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the User is trying to be deleted does not exist.',
  })
  async deleteRealGoal(@Param('id') inputsId: number) {
    return this.inputsService.deleteInputs(inputsId);
  }
}
