import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './app/users/entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/auth/auth.module';
import { FinancialControllModule } from './app/financial-control/financial-controll.module';
import { FinancialControll } from './app/financial-control/entities/financial-controll.entity';
import { IdealGoal } from './app/ideal-goal/entities/ideal-goal.entity';
import { IdealGoalModule } from './app/ideal-goal/ideal-goal.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'planeja',
      entities: [User, FinancialControll, IdealGoal],
      synchronize: process.env.ENV === 'development',
    }),
    UserModule,
    AuthModule,
    FinancialControllModule,
    IdealGoalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
