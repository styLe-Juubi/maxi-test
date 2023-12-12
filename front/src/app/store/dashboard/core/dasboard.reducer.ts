import { Action, createReducer, on } from "@ngrx/store";
import { DashboardState, initialDashboardState } from "../dashboard.state";
import * as actions from './dashboard.action';

const _dashboardReducer = createReducer(
    initialDashboardState,

    // Employee
    on( actions.createEmployee, state => ({ ...state })),
    on( actions.createEmployeeSuccess, ( state, { res }) => ({
        ...state, employee: res, createdEmployee: true,
    })),
    on( actions.resetCreatedEmployee, state => ({
        ...state, createdEmployee: undefined,
    })),
    on( actions.getEmployee, state => ({ ...state })),
    on( actions.getEmployeeSuccess, ( state, { res }) => ({
        ...state, employee: res,
    })),
    on( actions.getEmployees, state => ({ ...state })),
    on( actions.getEmployeesSuccess, ( state, { res }) => ({
        ...state, employees: res,
    })),
    on( actions.resetEmployee, state => ({ ...state, employee: undefined })),
    on( actions.deleteEmployee, state => ({ ...state })),
    on( actions.deleteEmployeeSuccess, state => ({
        ...state, employee: undefined, deletedEmployee: true,
    })),
    on( actions.resetDeletedEmployeeFlag, state => ({
        ...state, deletedEmployee: undefined,
    })),

    // Beneficiary
    on( actions.createBeneficiary, state => ({ ...state })),
    on( actions.createBeneficiarySuccess, ( state, { res }) => ({
        ...state, beneficiary: res, createdBeneficiary: true,
    })),
    on( actions.resetCreatedBeneficiary, state => ({
        ...state, createdBeneficiary: undefined,
    })),
    on( actions.getBeneficiary, state => ({ ...state })),
    on( actions.getBeneficiarySuccess, ( state, { res }) => ({
        ...state, beneficiary: res,
    })),
    on( actions.getBeneficiaries, state => ({ ...state })),
    on( actions.getBeneficiariesSuccess, ( state, { res }) => ({
        ...state, beneficiaries: res,
    })),
    on( actions.resetBeneficiary, state => ({ ...state, beneficiary: undefined })),
    on( actions.deleteBeneficiary, state => ({ ...state })),
    on( actions.deleteBeneficiarySuccess, state => ({
        ...state, beneficiary: undefined, deletedBeneficiary: true,
    })),
    on( actions.resetDeletedBeneficiaryFlag, state => ({
        ...state, deletedBeneficiary: undefined,
    })),

    // Error
    on( actions.dashboardError, ( state, { res }) => ({
        ...state, error: res
    })),
    on( actions.resetDashboardError, state => ({ ...state, error: undefined })),
);

export function dashboardReducer(
    state: DashboardState | undefined,
    action: Action,
) {
    return _dashboardReducer( state, action );
}