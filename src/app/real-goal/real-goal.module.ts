import { Module, forwardRef } from '@nestjs/common';
import { RealGoalController } from './real-goal.controller';
import { RealGoalService } from './real-goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealGoal } from './entities/real-goal.entity';
import { IdealGoalModule } from '../ideal-goal/ideal-goal.module';
import { InputsModule } from '../inputs/inputs.module';

@Module({
  controllers: [RealGoalController],
  imports: [
    TypeOrmModule.forFeature([RealGoal]),
    IdealGoalModule,
    forwardRef(() => InputsModule),
  ],
  exports: [RealGoalService],
  providers: [RealGoalService],
})
export class RealGoalModule {}
