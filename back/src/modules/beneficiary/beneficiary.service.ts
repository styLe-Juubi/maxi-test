import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GenericService } from 'src/common/providers/generic.service';
import { Beneficiary } from './entities/beneficiary.entity';
import { PaginateModel } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { v4 as uuid } from 'uuid';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class BeneficiaryService extends GenericService {

  constructor(
    @InjectModel( Beneficiary.name ) readonly beneficiaryModel: PaginateModel<Beneficiary>,
    private readonly configService: ConfigService,
    private readonly employeeService: EmployeeService,
  ) { 
    super( beneficiaryModel, configService.get( 'pagination' ), 'BeneficiaryService' )
  }

  async createDto( dto: CreateBeneficiaryDto ): Promise<Beneficiary> {

    await this.employeeService.findOne( dto.employee );
    
    let percentage = dto.percentage;
    const employeeBeneficiaries = await this.beneficiaryModel.find({ employee: dto.employee });

    if ( employeeBeneficiaries || employeeBeneficiaries.length > 0 ) {

      this.verifyBeneficiariesMaxSum( percentage, employeeBeneficiaries );
    }

    const beneficiarySaved = await this.create<Beneficiary, CreateBeneficiaryDto>({
      ...dto,
      uuid: uuid(),
      percentage,
    });

    if ( !beneficiarySaved )
      throw new InternalServerErrorException(`An error has occurred on the server`);

    let empBeneficiaries = (await this.employeeService.findOne<Employee>( dto.employee )).beneficiaries;
    empBeneficiaries.push( beneficiarySaved._id );

    const benPushSaved = await this.employeeService.update( dto.employee, {
      beneficiaries: empBeneficiaries,
    });

    if ( !benPushSaved )
      throw new InternalServerErrorException(`An error occurred while saving the beneficiary`);

    return beneficiarySaved;
  }

  async verifyPercentageToUpdate( id: string, percentage: number ): Promise<boolean> {

    const beneficiary = await this.findOne<Beneficiary>( id );
    let employeeBeneficiaries = await this.beneficiaryModel.find({
      employee: beneficiary.employee,
    });
    employeeBeneficiaries = employeeBeneficiaries
      .filter(x => x._id.toString() !== id );
    
    this.verifyBeneficiariesMaxSum( percentage, employeeBeneficiaries );

    return true;
  }

  verifyBeneficiariesMaxSum(
    percentage: number,
    beneficiaries: Beneficiary[] 
  ): boolean {

    let benSum: number = 0;
    beneficiaries.map(( beneficiary: Beneficiary ) => {

        benSum = benSum + beneficiary.percentage;
        if (( percentage + benSum ) > 100 )
          throw new BadRequestException(
            `The sum of the percentage of the beneficiaries must be 100%, The remaining amount is: ${ ( 100 - benSum )}`
          );
      });

    return true;
  }

  async delete( id: string ): Promise<Beneficiary> {
    await this.findOne( id );

    const beneficiaryDeleted = await this.beneficiaryModel
      .findByIdAndDelete( id, { new: true });

    const employee = await this.employeeService
      .findOne<Employee>( beneficiaryDeleted.employee.toString() );
    
    const benefs = employee.beneficiaries
      .filter(( x: any ) => ( x.toString() !== id ));
    await this.employeeService.update( employee._id.toString(), { beneficiaries: benefs });
    
    return beneficiaryDeleted;
  }
}
