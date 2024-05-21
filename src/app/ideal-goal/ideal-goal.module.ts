import { Module, forwardRef } from '@nestjs/common';
import { IdealGoalController } from './ideal-goal.controller';
import { IdealGoalService } from './ideal-goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdealGoal } from './entities/ideal-goal.entity';
import { FinancialControllModule } from '../financial-control/financial-controll.module';
import { RealGoalModule } from '../real-goal/real-goal.module';

@Module({
  controllers: [IdealGoalController],
  imports: [
    TypeOrmModule.forFeature([IdealGoal]),
    FinancialControllModule,
    forwardRef(() => RealGoalModule),
  ],
  exports: [IdealGoalService],
  providers: [IdealGoalService],
})
export class IdealGoalModule {}
