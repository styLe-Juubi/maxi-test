import { createAction, props } from "@ngrx/store";
import { EmployeeModel } from "../models/employee.model";
import { PaginationResponseModel } from "src/app/shared/models/pagination-response.model";
import { BeneficiaryModel } from "../models/beneficiary.model";
import { ErrorModel } from "src/app/shared/models/error.model";
import { CreateEmployeeModel } from "../models/create-employee.model";
import { CreateBeneficiaryModel } from "../models/create-beneficiary.model";

export enum DashboardActionTypes {
    CREATE_EMPLOYEE = '[Dashboard] Create employee',
    CREATE_EMPLOYEE_SUCCESS = '[Dashboard] Create employee success',
    RESET_CREATED_EMPLOYEE = '[Dashboard] Reset created employee',
    EMPLOYEE = '[Dashboard] Employee',
    EMPLOYEE_SUCCESS = '[Dashboard] Employee success',
    RESET_EMPLOYEE = '[Dashboard] Reset employee',
    EMPLOYEES = '[Dashboard] Employees',
    EMPLOYEES_SUCCESS = '[Dashboard] Employees success',
    DELETE_EMPLOYEE = '[Dashboard] Delete employee',
    DELETE_EMPLOYEE_SUCCESS = '[Dashboard] Delete employee success',
    RESET_EMPLOYEE_DELETED = '[Dashboard] Reset employee flag deleted',

    CREATE_BENEFICIARY = '[Dashboard] Create beneficiary',
    CREATE_BENEFICIARY_SUCCESS = '[Dashboard] Create beneficiary success',
    RESET_CREATED_BENEFICIARY = '[Dashboard] Reset created beneficiary',
    BENEFICIARY = '[Dashboard] Beneficiary',
    BENEFICIARY_SUCCESS = '[Dashboard] Beneficiary success',
    RESET_BENEFICIARY = '[Dashboard] Reset beneficiary',
    BENEFICIARIES = '[Dashboard] Beneficiaries',
    BENEFICIARIES_SUCCESS = '[Dashboard] Beneficiaries success',
    DELETE_BENEFICIARY = '[Dashboard] Delete beneficiary',
    DELETE_BENEFICIARY_SUCCESS = '[Dashboard] Delete beneficiary success',
    RESET_BENEFICIARY_DELETED = '[Dashboard] Reset beneficiary flag deleted',

    ERROR_DASHBOARD = '[Dashboard] Error',
    ERROR_RESET_DASHBOARD = '[Dashboard] Reset error',
}

/**
 * * Employee Actions
 */
export const createEmployee = createAction(
    DashboardActionTypes.CREATE_EMPLOYEE,
    props<{ form: CreateEmployeeModel }>(),
);
export const resetCreatedEmployee = createAction(
    DashboardActionTypes.RESET_CREATED_EMPLOYEE
);
export const createEmployeeSuccess = createAction(
    DashboardActionTypes.CREATE_EMPLOYEE_SUCCESS,
    props<{ res: EmployeeModel }>(),
);
export const getEmployee = createAction(
    DashboardActionTypes.EMPLOYEE,
    props<{ id: string }>(),
);
export const getEmployeeSuccess = createAction(
    DashboardActionTypes.EMPLOYEE_SUCCESS,
    props<{ res: EmployeeModel }>(),
);
export const resetEmployee = createAction(
    DashboardActionTypes.RESET_EMPLOYEE,
);
export const getEmployees = createAction(
    DashboardActionTypes.EMPLOYEES,
    props<{ queries: any }>(),
);
export const getEmployeesSuccess = createAction(
    DashboardActionTypes.EMPLOYEES_SUCCESS,
    props<{ res: PaginationResponseModel<EmployeeModel> }>(),
);
export const deleteEmployee = createAction(
    DashboardActionTypes.DELETE_EMPLOYEE,
    props<{ id: string }>(),
);
export const deleteEmployeeSuccess = createAction(
    DashboardActionTypes.DELETE_EMPLOYEE_SUCCESS,
);
export const resetDeletedEmployeeFlag = createAction(
    DashboardActionTypes.RESET_EMPLOYEE_DELETED
);

/**
 * * Beneficiary Actions
 */
export const createBeneficiary = createAction(
    DashboardActionTypes.CREATE_BENEFICIARY,
    props<{ form: CreateBeneficiaryModel }>(),
);
export const resetCreatedBeneficiary = createAction(
    DashboardActionTypes.RESET_CREATED_BENEFICIARY
);
export const createBeneficiarySuccess = createAction(
    DashboardActionTypes.CREATE_BENEFICIARY_SUCCESS,
    props<{ res: BeneficiaryModel }>(),
);
export const getBeneficiary = createAction(
    DashboardActionTypes.BENEFICIARY,
    props<{ id: string }>(),
);
export const getBeneficiarySuccess = createAction(
    DashboardActionTypes.BENEFICIARY_SUCCESS,
    props<{ res: BeneficiaryModel }>(),
);
export const getBeneficiaries = createAction(
    DashboardActionTypes.BENEFICIARIES,
    props<{ queries: any }>(),
);
export const getBeneficiariesSuccess = createAction(
    DashboardActionTypes.BENEFICIARIES_SUCCESS,
    props<{ res: PaginationResponseModel<BeneficiaryModel> }>(),
);
export const resetBeneficiary = createAction(
    DashboardActionTypes.RESET_BENEFICIARY,
);
export const deleteBeneficiary = createAction(
    DashboardActionTypes.DELETE_BENEFICIARY,
    props<{ id: string }>(),
);
export const deleteBeneficiarySuccess = createAction(
    DashboardActionTypes.DELETE_BENEFICIARY_SUCCESS,
);
export const resetDeletedBeneficiaryFlag = createAction(
    DashboardActionTypes.RESET_BENEFICIARY_DELETED
);

/**
 * * Error Actions
 */
export const dashboardError = createAction(
    DashboardActionTypes.ERROR_DASHBOARD,
    props<{ res: ErrorModel }>()
)
export const resetDashboardError = createAction( 
    DashboardActionTypes.ERROR_RESET_DASHBOARD, 
);

