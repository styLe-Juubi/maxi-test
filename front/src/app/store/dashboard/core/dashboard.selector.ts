import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState, dashboardFeatureName } from "../dashboard.state";

export const getDashboardFeatureState = createFeatureSelector<DashboardState>(
    dashboardFeatureName
);

/**
 * * Select Created Employee Flag
 */
export const selectCreatedEmployeeFlag = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.createdEmployee,
);

/**
 * * Select Employee
 */
export const selectEmployee = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.employee,
);

/**
 * * Select Employees
 */
export const selectEmployees = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.employees,
);

/**
 * * Select Deleted Employee Flag
 */
export const selectDeletedEmployeeFlag = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.deletedEmployee,
);

/**
 * * Select Created Beneficiary Flag
 */
export const selectCreatedBeneficiaryFlag = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.createdBeneficiary,
);

/**
 * * Select Beneficiary
 */
export const selectBeneficiary = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.beneficiary,
);

/**
 * * Select Beneficiaries
 */
export const selectBeneficiaries = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.beneficiaries,
);

/**
 * * Select Deleted Beneficiary Flag
 */
export const selectDeletedBeneficiaryFlag = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.deletedBeneficiary,
);

/**
 * * Select Error
 */
export const selectErrorDashboard = createSelector(
    getDashboardFeatureState,
    ( state: DashboardState ) => state.error,
);