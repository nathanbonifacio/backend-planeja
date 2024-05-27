/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Inputs } from './entities/inputs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealGoalService } from '../real-goal/real-goal.service';
import { CreateInputsDto } from './dto/create-inputs.dto';
import { FinancialControllService } from '../financial-control/financial-controll.service';
import { BaseService } from 'src/base/base.service';
import { UpdateInputsDto } from './dto/update-inputs.dto';

@Injectable()
export class InputsService extends BaseService<Inputs> {
  constructor(
    @InjectRepository(Inputs)
    private readonly inputsRepository: Repository<Inputs>,

    private realGoalService: RealGoalService,
    private financialControllService: FinancialControllService,
  ) {
    super(inputsRepository);
  }

  async createInputs(createInputsDto: CreateInputsDto) {
    const existingRealGoal = await this.realGoalService._getByParams({
      id: createInputsDto.realGoalId,
    });
    if (!existingRealGoal) {
      throw new BadRequestException(
        `Meta real ${existingRealGoal.id} não encontrada.`,
      );
    }

    const existingFinancialControll =
      await this.financialControllService._getByParams({
        id: createInputsDto.financialControllId,
      });
    if (!existingFinancialControll) {
      throw new BadRequestException('Controle financeiro não encontrado');
    }

    if (!createInputsDto.date) {
      createInputsDto.date = new Date();
    }

    return this.inputsRepository.save(createInputsDto);
  }

  async updateInputs(inputsId: number, updateInputs: UpdateInputsDto) {
    const existingInputs = this._getByParams({
      id: inputsId,
    });
    if (!existingInputs) {
      throw new BadRequestException('Entradas inválidas.');
    }

    return this.inputsRepository.update(inputsId, updateInputs);
  }

  async deleteInputs(inputsId: number) {
    const existingInputs = this._getByParams({
      id: inputsId,
    });
    if (!existingInputs) {
      throw new BadRequestException('Entradas inválidas.');
    }

    return this.inputsRepository.delete(inputsId);
  }
}
