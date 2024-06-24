import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { RealGoal } from './entities/real-goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdealGoalService } from '../ideal-goal/ideal-goal.service';
import { CreateRealGoalDto } from './dto/create-real-goal.dto';
import { Repository } from 'typeorm';
import { UpdateRealGoalDto } from './dto/update-real-goal.dto';
import { ItemNotFoundException } from 'src/common/exceptions/item-not-found.exception';
import { InputsService } from '../inputs/inputs.service';
import { CreateInputsDto } from '../inputs/dto/create-inputs.dto';

@Injectable()
export class RealGoalService extends BaseService<RealGoal> {
  constructor(
    @InjectRepository(RealGoal)
    private readonly realGoalRepository: Repository<RealGoal>,

    private idealGoalService: IdealGoalService,

    @Inject(forwardRef(() => InputsService))
    private inputsService: InputsService,
  ) {
    super(realGoalRepository);
  }

  async createRealGoal(createRealGoalDto: CreateRealGoalDto) {
    const existingIdealGoal = await this.idealGoalService._getByParams({
      id: createRealGoalDto.idealGoalId,
    });
    if (!existingIdealGoal) {
      throw new ItemNotFoundException(`${existingIdealGoal.id}`);
    }

    if (!createRealGoalDto.date) {
      createRealGoalDto.date = new Date();
    }

    const realGoal = this.realGoalRepository.save(createRealGoalDto);

    const createInputsDto: CreateInputsDto = {
      realGoalId: (await realGoal).id,
      date: createRealGoalDto.date,
      balance: createRealGoalDto.addedValue,
      financialControllId: existingIdealGoal.financialControllId,
    };

    await this.inputsService.createInputs(createInputsDto);

    return realGoal;
  }

  async updateRealGoal(
    realGoalId: number,
    updateRealGoalDto: UpdateRealGoalDto,
  ) {
    const existingRealGoal = await this._getByParams({
      id: realGoalId,
    });
    if (!existingRealGoal) {
      throw new BadRequestException(
        `A meta real ${realGoalId} não foi encontrada`,
      );
    }

    const existingIdealGoal = await this.idealGoalService._getByParams({
      id: updateRealGoalDto.idealGoalId,
    });
    if (!existingIdealGoal) {
      throw new BadRequestException(
        `A meta ideal ${existingIdealGoal.id} não foi encontrada`,
      );
    }

    return this.realGoalRepository.update(realGoalId, updateRealGoalDto);
  }

  async deleteRealGoal(realGoalId: number) {
    const existingRealGoal = await this._getByParams({
      id: realGoalId,
    });
    if (!existingRealGoal) {
      throw new BadRequestException(
        `A meta real ${realGoalId} não foi encontrada`,
      );
    }

    return this.realGoalRepository.delete(realGoalId);
  }
}
