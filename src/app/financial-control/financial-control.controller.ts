import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { FinancialControllService } from './financial-controll.service';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateFinancialControllDto } from './dto/create-financial-controll.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdateFinancialControllDto } from './dto/update-financial-controll.dto';

@Controller('financial-controll')
export class FinancialControllController {
  constructor(
    private readonly financialControllService: FinancialControllService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'creates a new user financial controll.' })
  @ApiCreatedResponse({
    type: CreateUserDto,
    description:
      'Value returned whenever a user financial controll is created successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  async createFinancialControll(
    @Body() createFinancialControllDto: CreateFinancialControllDto,
  ): Promise<CreateFinancialControllDto> {
    return this.financialControllService.createFinancialControll(
      createFinancialControllDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates an user financial controlll by its ID.' })
  @ApiOkResponse({
    type: UpdateUserDto,
    description:
      'Value returned whenever a user financial controll is updated successfully.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description: 'Error thrown whenever an input is incorrectly set.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the user is trying to be updated does not exist.',
  })
  async updateFinancialControll(
    @Param('id') financialId: number,
    @Body() updateFinancialControll: UpdateFinancialControllDto,
  ) {
    return this.financialControllService.updateFinancialControll(
      financialId,
      updateFinancialControll,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an User financial controll by its ID.' })
  @ApiNoContentResponse({
    description:
      'Value returned whenever a User financial controll is deleted successfully.',
  })
  @ApiNotFoundResponse({
    description:
      'Error thrown whenever the User is trying to be deleted does not exist.',
  })
  async deleteFinancialControll(@Param('id') financialId: number) {
    return this.financialControllService.deleteFinancialControll(financialId);
  }
}
