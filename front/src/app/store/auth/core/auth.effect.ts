import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActionTypes } from './auth.action';
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import * as actions from './auth.action';
import { AuthService } from "../../../shared/services/auth.service";
import { LoginModel, UserModel } from "../models";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { UiState } from "../../ui/ui.state";
import { loaderActive, loaderInactive } from "../../ui/core/ui.action";
import { ErrorModel } from "src/app/shared/models/error.model";

@Injectable()
export class AuthEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly toastrService: ToastrService,
        private readonly uiStore: Store<UiState>,
    ) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType( AuthActionTypes.LOGIN_AUTH ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(2000),
            map(( action: any ) => action.form ),
            switchMap(( action: LoginModel ) => 
                this.authService.login( action ).pipe(
                    map(( value ) => {
                        this.saveTokenAndUser( value.token ?? '', value.user!, '/dashboard' );
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.loginSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.authError({ res: error }));
                    }),
                )
            )
        )
    );

    logout$ = createEffect(() => 
        this.actions$.pipe(
            ofType( AuthActionTypes.LOGOUT_AUTH ),
            tap(() => {
                this.logoutAndRemoveToken();
            }),
        ), { dispatch: false }
    );

    checkStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType( AuthActionTypes.CHECK_STATUS_AUTH ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(2000),
            map(( action: any ) => action ),
            switchMap(() => 
                this.authService.checkStatus().pipe(
                    map(( value ) => {
                        this.saveTokenAndUser( value.token!, value.user! );
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.checkStatusSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.checkStatusError({ res: error }));
                    }),
                )
            )
        )
    );

    checkStatusResetError$ = createEffect(() => 
        this.actions$.pipe(
            ofType( AuthActionTypes.CHECK_STATUS_AUTH_RESET_ERROR ),
            tap(() => {
                this.userSessionEnded();
            }),
        ), { dispatch: false }
    );

    /**
     * * Protected functions 
     */
    protected saveTokenAndUser(
        token: string,
        user: UserModel,
        route?: string
    ): void {

        if ( !user.roles.includes('admin') ) {

            this.toastrService.info('Para acceder a la plataforma solicita los permisos correspondientes a un administrador');
            this.router.navigate(['/auth/login']);
            return;
        }

        this.authService.saveTokenAndUser( token, user );
        this.toastrService.success(`Bienvenid@ ${ user.username }`);

        ( route ) && this.router.navigate([ route ]);
    }

    protected logoutAndRemoveToken(): void {
        this.authService.removeTokenAndUser();
        this.router.navigate(['/']);
    }
    
    protected userSessionEnded(): void {
        this.authService.removeTokenAndUser();
        this.toastrService.info('Tu sesión ha finalizado, vuelve a iniciar sesión !');
        this.router.navigate(['/auth/login']);
    }

    protected showMessageAndNavigateNewPassword(
        message: string,
        resendCode: string,
    ): void {
        this.toastrService.success( message );
        this.router.navigate(
            ['/auth/restore-password'], {
                queryParams: { 
                    resendCode
                }
            }
        );
    }
}