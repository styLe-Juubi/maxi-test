import { ErrorModel } from "src/app/shared/models/error.model";
import { EmployeeModel } from "./models/employee.model";
import { BeneficiaryModel } from "./models/beneficiary.model";
import { PaginationResponseModel } from "src/app/shared/models/pagination-response.model";

export const dashboardFeatureName = 'DASHBOARD';

export interface DashboardState {
    createdEmployee?: boolean;
    employee?: EmployeeModel;
    employees?: PaginationResponseModel<EmployeeModel>;
    deletedEmployee?: boolean;
    
    createdBeneficiary?: boolean;
    beneficiary?: BeneficiaryModel;
    beneficiaries?: PaginationResponseModel<BeneficiaryModel>;
    deletedBeneficiary?: boolean;
    error?: ErrorModel;
}

export const initialDashboardState: DashboardState = {
    createdEmployee: undefined,
    employee: undefined,
    employees: undefined,
    deletedEmployee: undefined,
    createdBeneficiary: undefined,
    beneficiary: undefined,
    beneficiaries: undefined,
    deletedBeneficiary: undefined,
    error: undefined,
}