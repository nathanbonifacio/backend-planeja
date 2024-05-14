import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { FinancialControllController } from './financial-control.controller';
import { FinancialControllService } from './financial-controll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialControll } from './entities/financial-controll.entity';

@Module({
  controllers: [FinancialControllController],
  imports: [
    TypeOrmModule.forFeature([FinancialControll]),
    forwardRef(() => UserModule),
  ],
  exports: [FinancialControllService],
  providers: [FinancialControllService],
})
export class FinancialControllModule {}
