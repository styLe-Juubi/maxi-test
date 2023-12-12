import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { ConfigService } from '@nestjs/config';
import { GenericService } from 'src/common/providers/generic.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeeService extends GenericService {

  constructor(
    @InjectModel( Employee.name ) readonly employeeModel: PaginateModel<Employee>,
    private readonly configService: ConfigService,
  ) { 
    super( employeeModel, configService.get( 'pagination' ), 'EmployeeService' )
  }

  async createDto( dto: CreateEmployeeDto ): Promise<Employee> {

    return await this.create({
      ...dto,
      uuid: uuid(),
      employee_number: this.generateEmployeeNumber(),
    });
  }

  generateEmployeeNumber(): string {
    const randomString = ( length: number ) => {

      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;

      while (counter < length) {

        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }

      return result;
    }

    return randomString( 10 ).toUpperCase();
  }
}
