import { Module } from '@nestjs/common';
import { InputsController } from './inputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inputs } from './entities/inputs.entity';
import { RealGoalModule } from '../real-goal/real-goal.module';
import { FinancialControllModule } from '../financial-control/financial-controll.module';
import { InputsService } from './inputs.service';

@Module({
  controllers: [InputsController],
  imports: [
    TypeOrmModule.forFeature([Inputs]),
    RealGoalModule,
    FinancialControllModule,
  ],
  providers: [InputsService],
  exports: [InputsService],
})
export class InputsModule {}
