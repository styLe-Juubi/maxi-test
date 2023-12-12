import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beneficiary, BeneficiarySchema } from './entities/beneficiary.entity';
import { AuthModule } from '../auth/auth.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Beneficiary.name, useFactory: () => ( BeneficiarySchema )},
    ]),
    AuthModule,
    EmployeeModule,
  ],
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService]
})
export class BeneficiaryModule {}
