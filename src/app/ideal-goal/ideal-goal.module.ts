/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IdealGoalController } from './ideal-goal.controller';
import { IdealGoalService } from './ideal-goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdealGoal } from './entities/ideal-goal.entity';
import { FinancialControllModule } from '../financial-control/financial-controll.module';

@Module({
  controllers: [IdealGoalController],
  imports: [
    TypeOrmModule.forFeature([IdealGoal]),
    FinancialControllModule,
  ],
  exports: [IdealGoalService],
  providers: [IdealGoalService],
})
export class IdealGoalModule {}
