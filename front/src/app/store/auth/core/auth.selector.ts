import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureName } from "../auth.state";

export const getAuthFeatureState = createFeatureSelector<AuthState>(
    authFeatureName
);

/**
 * * Select User
 */
export const selectUserAuth = createSelector(
    getAuthFeatureState,
    ( state: AuthState ) => state.user,
);

/**
 * * Select Token
 */
export const selectTokenAuth = createSelector(
    getAuthFeatureState,
    ( state: AuthState ) => state.token,
);

/**
 * * Select Error
 */
export const selectErrorAuth = createSelector(
    getAuthFeatureState,
    ( state: AuthState ) => state.error,  
);
export const selectCheckStatusErrorAuth = createSelector(
    getAuthFeatureState,
    ( state: AuthState ) => state.checkStatusError,
);
