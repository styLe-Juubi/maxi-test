import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Employee.name, useFactory: () => ( EmployeeSchema )},
    ]),
    AuthModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [
    MongooseModule, 
    EmployeeService
  ],
})
export class EmployeeModule {}
