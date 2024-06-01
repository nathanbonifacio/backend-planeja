import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { FinancialControll } from './entities/financial-controll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFinancialControllDto } from './dto/create-financial-controll.dto';
import { UserService } from '../users/users.service';
import { UpdateFinancialControllDto } from './dto/update-financial-controll.dto';
import { SchemaValidationException } from 'src/common/exceptions/schema-validation.exception';
import { ItemNotFoundException } from 'src/common/exceptions/item-not-found.exception';

@Injectable()
export class FinancialControllService extends BaseService<FinancialControll> {
  constructor(
    @InjectRepository(FinancialControll)
    private readonly financialControllRepository: Repository<FinancialControll>,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {
    super(financialControllRepository);
  }

  async createFinancialControll(
    createFinancialControlDto: CreateFinancialControllDto,
  ) {
    const existingUser = await this.userService._getByParams({
      id: createFinancialControlDto.userId,
    });
    if (!existingUser) {
      throw new SchemaValidationException('validations.user.user-not-found');
    }

    return this.financialControllRepository.save(createFinancialControlDto);
  }

  async updateFinancialControll(
    financialId: number,
    updateFinancialControl: UpdateFinancialControllDto,
  ) {
    const existingUser = await this.userService._getByParams({
      id: financialId,
    });
    if (!existingUser) {
      throw new SchemaValidationException('validations.user.user-not-found');
    }

    const financialUpdated = await this.financialControllRepository.update(
      financialId,
      updateFinancialControl,
    );

    return financialUpdated;
  }

  async deleteFinancialControll(financialId: number) {
    const existingFinancialId = await this._getByParams({
      id: financialId,
    });
    if (!existingFinancialId) {
      throw new ItemNotFoundException(financialId);
    }

    return this.financialControllRepository.delete(financialId);
  }
}
