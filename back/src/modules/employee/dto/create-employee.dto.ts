import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateEmployeeDto {

    @IsOptional()
    @IsUUID()
    uuid: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly surname: string;

    @IsString()
    readonly birthdate: string;

    @IsOptional()
    @IsString()
    employee_number: string;

    @IsString()
    readonly curp: string;

    @IsString()
    readonly ssn: string;

    @IsNumber()
    @Min(1000000000)
    @Max(9999999999)
    readonly phone: number;

    @IsString()
    readonly nationality: string;
}
