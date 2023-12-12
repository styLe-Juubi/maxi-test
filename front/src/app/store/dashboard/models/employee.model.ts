import { BeneficiaryModel } from "./beneficiary.model";

export interface EmployeeModel {
    _id: string;
    uuid: string;
    name: string;
    surname: string;
    birthdate: string;
    employee_number: string;
    curp: string;
    ssn: string;
    phone: number;
    nationality: string;
    beneficiaries: BeneficiaryModel[];
    active: boolean;
}