import { Action, createReducer, on } from "@ngrx/store";
import * as actions from './auth.action';
import { AuthState, initialAuthState } from "../auth.state";

const _authReducer = createReducer(
    initialAuthState,

    // Login
    on( actions.login, state => ({ ...state })),
    on( actions.loginSuccess, ( state, { res }) => ({ 
        ...state, user: res.user, token: res.token
    })),

    // Logout
    on( actions.logout, state => ( initialAuthState )),


    // Check Status
    on( actions.checkStatus, state => ({ ...state })),
    on( actions.checkStatusSuccess, ( state, { res }) => ({
        ...state, user: res.user, token: res.token
    })),
    on( actions.checkStatusError, ( state, { res }) => ({ 
        ...state, checkStatusError: res
    })),
    on( actions.checkStatusResetError, state => 
        ({ ...state, checkStatusError: undefined })
    ),

    // Error
    on( actions.authError, ( state, { res }) => ({
        ...state, error: res
    })),
    on( actions.resetAuthError, state => ({ ...state, error: undefined })),
);

export function authReducer(
    state: AuthState | undefined,
    action: Action,
) {
    return _authReducer( state, action );
}
