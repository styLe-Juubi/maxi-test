import { EmployeeModel } from "./employee.model";

export interface BeneficiaryModel {
    _id: string;
    uuid: string;
    name: string;
    surname: string;
    birthdate: string;
    curp: string;
    ssn: string;
    phone: number;
    nationality: string;
    percentage: number;
    employee: EmployeeModel | string;
    active: boolean;
}