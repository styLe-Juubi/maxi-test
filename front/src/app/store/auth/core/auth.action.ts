import { createAction, props } from '@ngrx/store';
import { LoginModel, UserWithTokenModel } from '../models';
import { ErrorModel } from 'src/app/shared/models/error.model';

export enum AuthActionTypes {
    LOGIN_AUTH = '[Auth] Login',
    LOGIN_AUTH_SUCCESS = '[Auth] Login Success',

    LOGOUT_AUTH = '[Auth] Logout',

    CHECK_STATUS_AUTH = '[Auth] Check status',
    CHECK_STATUS_AUTH_SUCCES = '[Auth] Check status success',
    CHECK_STATUS_AUTH_ERROR = '[Auth] Check status error',
    CHECK_STATUS_AUTH_RESET_ERROR = '[Auth] Check status reset Error',

    ERROR_AUTH = '[Auth] Error',
    ERROR_RESET_AUTH = '[Auth] Reset error',
}

/**
 * * Login Actions
 */
export const login = createAction(
    AuthActionTypes.LOGIN_AUTH,
    props<{ form: LoginModel }>(),
);
export const loginSuccess = createAction(
    AuthActionTypes.LOGIN_AUTH_SUCCESS,
    props<{ res: Partial<UserWithTokenModel> }>(),
)

/**
 * * Logout Actions
 */
export const logout = createAction(
    AuthActionTypes.LOGOUT_AUTH,  
);

/**
 * * Check Status Actions
 */
export const checkStatus = createAction(
    AuthActionTypes.CHECK_STATUS_AUTH,
);
export const checkStatusSuccess = createAction(
    AuthActionTypes.CHECK_STATUS_AUTH_SUCCES,
    props<{ res: Partial<UserWithTokenModel> }>()
);
export const checkStatusError = createAction(
    AuthActionTypes.CHECK_STATUS_AUTH_ERROR,
    props<{ res: ErrorModel }>(),
);
export const checkStatusResetError = createAction(
    AuthActionTypes.CHECK_STATUS_AUTH_RESET_ERROR,
);

/**
 * * Error Actions
 */
export const authError = createAction(
    AuthActionTypes.ERROR_AUTH,
    props<{ res: ErrorModel }>()
)
export const resetAuthError = createAction( 
    AuthActionTypes.ERROR_RESET_AUTH, 
);
