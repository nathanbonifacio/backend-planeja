/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { IdealGoal } from './entities/ideal-goal.entity';
import { Repository } from 'typeorm';
import { CreateIdealGoalDto } from './dto/create-ideal-goal.dto';
import { FinancialControllService } from '../financial-control/financial-controll.service';
import { UpdateIdealGoalDto } from './dto/update-ideal-goal.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdealGoalService extends BaseService<IdealGoal> {
  constructor(
    @InjectRepository(IdealGoal)
    private readonly idealGoalRepository: Repository<IdealGoal>,

    private financialControllService: FinancialControllService,
  ) {
    super(idealGoalRepository);
  }

  async createIdealGoal(createIdealGoalDto: CreateIdealGoalDto) {
    const existingFinancialControll =
      await this.financialControllService._getByParams({
        id: createIdealGoalDto.financialControllId,
      });
    if (!existingFinancialControll) {
      throw new BadRequestException('Controle financeiro não encontrado');
    }

    if (!createIdealGoalDto.goalName || !createIdealGoalDto.totalValue) {
      throw new BadRequestException(
        "Os campos 'Objetivo' e 'Valor Total' são obrigatórios",
      );
    }

    if (
      createIdealGoalDto.monthlyValue &&
      createIdealGoalDto.monthlyValue > existingFinancialControll.income
    ) {
      throw new BadRequestException(
        `Sua poupança mensal não pode ultrapassar o valor de sua renda. 
        ${createIdealGoalDto.monthlyValue} é maior que a sua renda de ${existingFinancialControll.income}.`,
      );
    }

    if (!createIdealGoalDto.startDate) {
      createIdealGoalDto.startDate = new Date();
    }

    if (!createIdealGoalDto.endDate && !createIdealGoalDto.monthlyValue) {
      throw new BadRequestException(
        'É necessário preencher ao menos um campo entre "Valor Mensal" ou "Data de Término"',
      );
    }

    if (createIdealGoalDto.monthlyValue && !createIdealGoalDto.endDate) {
      const { year, month } = this.calculateFutureDate(
        createIdealGoalDto.monthlyValue,
        createIdealGoalDto.totalValue,
      );
      createIdealGoalDto.endDate = new Date(
        year,
        month,
        createIdealGoalDto.startDate.getDate(),
      );
    } else if (createIdealGoalDto.endDate && !createIdealGoalDto.monthlyValue) {
      createIdealGoalDto.monthlyValue = this.calculateMonthlySavings(
        createIdealGoalDto.totalValue,
        createIdealGoalDto.endDate,
      );
    }

    const idealGoal = this.idealGoalRepository.create(createIdealGoalDto);
    return this.idealGoalRepository.save(idealGoal);
  }

  async updateIdealGoalById(
    idealGoalId: number,
    updateIdealGoalDto: UpdateIdealGoalDto,
  ) {
    const existingIdealGoal = await this._getByParams({ id: idealGoalId });
    if (!existingIdealGoal) {
      throw new BadRequestException('Meta não encontrada.');
    }
  
    if (updateIdealGoalDto.monthlyValue) {
      const newMonthlyValue = updateIdealGoalDto.monthlyValue;
      existingIdealGoal.monthlyValue = newMonthlyValue;
      const { year, month } = this.calculateFutureDate(
        newMonthlyValue,
        existingIdealGoal.totalValue,
      );
      existingIdealGoal.endDate = new Date(year, month, existingIdealGoal.startDate.getDate());
    }
  
    if (updateIdealGoalDto.endDate) {
      const newEndDate = new Date(updateIdealGoalDto.endDate);
      existingIdealGoal.endDate = newEndDate;
      existingIdealGoal.monthlyValue = this.calculateMonthlySavings(
        existingIdealGoal.totalValue,
        newEndDate,
      );
    }
  
    if (updateIdealGoalDto.totalValue && updateIdealGoalDto.totalValue !== existingIdealGoal.totalValue) {
      const newTotalValue = updateIdealGoalDto.totalValue;
      const remainingMonths = this.calculateRemainingMonths(existingIdealGoal.endDate);
      const newMonthlyValue = newTotalValue / remainingMonths;
      existingIdealGoal.totalValue = newTotalValue;
      existingIdealGoal.monthlyValue = newMonthlyValue;
    }
  
    existingIdealGoal.goalName = updateIdealGoalDto.goalName ?? existingIdealGoal.goalName;
    
    return this.idealGoalRepository.save(existingIdealGoal);
  }
  

  async deleteIdealGoalById(idealGoalId: number) {
    const existingIdealGoal = await this._getByParams({ id: idealGoalId });
    if (!existingIdealGoal) {
      throw new BadRequestException('Meta não encontrada.');
    }

    return this.idealGoalRepository.delete(idealGoalId);
  }

  private calculateFutureDate(
    monthlyValue: number,
    targetAmount: number,
  ): { year: number; month: number } {
    const today = new Date();
    const monthsToReachGoal = Math.ceil(targetAmount / monthlyValue);
    const futureDate = new Date(
      today.getFullYear(),
      today.getMonth() + monthsToReachGoal,
      today.getDate(),
    );
    return { year: futureDate.getFullYear(), month: futureDate.getMonth() };
  }

  private calculateMonthlySavings(
    targetAmount: number,
    deadline: Date | string,
  ): number {
    let endDate: Date;
    if (typeof deadline === 'string') {
      const [year, month, day] = deadline.split('-').map(Number);
      endDate = new Date(year, month - 1, day);
    } else {
      endDate = deadline;
    }

    const today = new Date();
    const remainingMonths =
      (endDate.getFullYear() - today.getFullYear()) * 12 +
      endDate.getMonth() -
      today.getMonth();
    if (remainingMonths <= 0) {
      throw new Error('Prazo inválido. A data limite deve ser no futuro.');
    }

    return targetAmount / remainingMonths;
  }

  private calculateRemainingMonths(endDate: Date): number {
    const today = new Date();
    return (
      (endDate.getFullYear() - today.getFullYear()) * 12 +
      endDate.getMonth() -
      today.getMonth()
    );
  }
}
