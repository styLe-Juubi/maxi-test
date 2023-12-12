import { Controller, Get, Post, Body, Patch, Param, Delete, createParamDecorator, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginateResult } from 'mongoose';
import { Employee } from './entities/employee.entity';
import { EmployeeQueriesDto } from './dto/employee-queries.dto';
import { Beneficiary } from '../beneficiary/entities/beneficiary.entity';
import { IPopulateField } from 'src/common/interfaces/populate-field.interface';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.enum';

@Controller('employee')
export class EmployeeController {

  private populatedFields: IPopulateField[] = [{ 
    path: 'beneficiaries',
    select: '-employee -active -createdAt -updatedAt',
    model: Beneficiary.name,
  }];

  constructor(private readonly employeeService: EmployeeService) {}
  
  @Auth([ ValidRoles.admin ])
  @Post()
  async create( @Body() createEmployeeDto: CreateEmployeeDto ) {
    return this.employeeService.createDto(createEmployeeDto);
  }

  @Auth([ ValidRoles.admin ])
  @Get()
  async findAll( @Query() queries: EmployeeQueriesDto ) {

    return this.employeeService
      .findAll<PaginateResult<Employee>, EmployeeQueriesDto>( queries, this.populatedFields );
  }

  @Auth([ ValidRoles.admin ])
  @Get(':id')
  async findOne( @Param( 'id', ParseMongoIdPipe ) id: string ) {
    return this.employeeService.findOne( id, this.populatedFields );
  }

  @Auth([ ValidRoles.admin ])
  @Patch(':id')
  async update(
      @Param( 'id', ParseMongoIdPipe ) id: string, 
      @Body() updateEmployeeDto: UpdateEmployeeDto
    ) {
    return this.employeeService.update( id , updateEmployeeDto);
  }

  @Auth([ ValidRoles.admin ])
  @Delete(':id')
  async toggleActive( @Param('id', ParseMongoIdPipe ) id: string ) {
    return this.employeeService.update( id, { active: false });
  }
}
