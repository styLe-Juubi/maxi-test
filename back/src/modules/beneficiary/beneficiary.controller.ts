import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { BeneficiaryQueriesDto } from './dto/beneficiary-queries.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.enum';

@Controller('beneficiary')
export class BeneficiaryController {

  constructor(
    private readonly beneficiaryService: BeneficiaryService
  ) {}

  @Auth([ ValidRoles.admin ])
  @Post()
  async create( @Body() createBeneficiaryDto: CreateBeneficiaryDto ) {
    return this.beneficiaryService.createDto(createBeneficiaryDto);
  }

  @Auth([ ValidRoles.admin ])
  @Get()
  findAll( @Query() queries: BeneficiaryQueriesDto ) {
    return this.beneficiaryService.findAll( queries );
  }

  @Auth([ ValidRoles.admin ])
  @Get(':id')
  async findOne( @Param('id', ParseMongoIdPipe ) id: string) {
    return this.beneficiaryService.findOne( id );
  }

  @Auth([ ValidRoles.admin ])
  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe ) id: string, 
    @Body() updateBeneficiaryDto: UpdateBeneficiaryDto
  ) {

    if ( updateBeneficiaryDto.percentage ) {
      
      await this.beneficiaryService.verifyPercentageToUpdate( id, updateBeneficiaryDto.percentage );
    }

    return this.beneficiaryService.update( id, updateBeneficiaryDto );
  }

  @Auth([ ValidRoles.admin ])
  @Delete(':id')
  async delete( @Param('id', ParseMongoIdPipe) id: string ) {
    return this.beneficiaryService.delete( id );
  }
}
