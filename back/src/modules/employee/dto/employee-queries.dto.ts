import { IsDate, IsDateString, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID, Max, Min } from "class-validator";
import { TransformToMongoRegex } from "src/common/decorators/transform-to-mongo-regex.decorator";
import { PaginationDto } from "src/common/dtos/pagination.dto";

export class EmployeeQueriesDto extends PaginationDto {

    @IsOptional()
    @TransformToMongoRegex()
    readonly uuid: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly name: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly surname: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly birthdate: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly employee_number: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly curp: RegExp;

    @IsOptional()
    @TransformToMongoRegex()
    readonly ssn: RegExp;

    @IsOptional()
    @IsNumber()
    @Min(1000000000)
    @Max(9999999999)
    readonly phone: number;

    @IsOptional()
    readonly nationality: RegExp;
}
