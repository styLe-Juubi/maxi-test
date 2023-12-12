import { ErrorModel } from "src/app/shared/models/error.model";
import { UserModel } from "./models";



export const authFeatureName = 'AUTH';

export interface AuthState {
    user?: UserModel; 
    token?: string;
    error?: ErrorModel;
    checkStatusError?: ErrorModel;
}

export const initialAuthState: AuthState = {
    user: undefined,
    token: undefined,
    error: undefined,
    checkStatusError: undefined,
}