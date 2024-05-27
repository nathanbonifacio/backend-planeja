import { Module } from '@nestjs/common';
import { RealGoalController } from './real-goal.controller';
import { RealGoalService } from './real-goal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealGoal } from './entities/real-goal.entity';
import { IdealGoalModule } from '../ideal-goal/ideal-goal.module';

@Module({
  controllers: [RealGoalController],
  imports: [TypeOrmModule.forFeature([RealGoal]), IdealGoalModule],
  exports: [RealGoalService],
  providers: [RealGoalService],
})
export class RealGoalModule {}
