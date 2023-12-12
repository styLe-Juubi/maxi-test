import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DashboardActionTypes } from "./dashboard.action";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { UiState } from "../../ui/ui.state";
import { loaderActive, loaderInactive } from "../../ui/core/ui.action";
import { EmployeeService } from "src/app/shared/services/employee.service";
import { BeneficiaryService } from "src/app/shared/services/beneficiary.service";
import * as actions from './dashboard.action';
import { ErrorModel } from "src/app/shared/models/error.model";
import { CreateEmployeeModel } from "../models/create-employee.model";
import { CreateBeneficiaryModel } from "../models/create-beneficiary.model";

@Injectable()
export class DashboardEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly uiStore: Store<UiState>,
        private readonly employeeService: EmployeeService,
        private readonly beneficiaryService: BeneficiaryService,
    ) {}

    createEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.CREATE_EMPLOYEE ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.form ),
            switchMap(( action: CreateEmployeeModel ) => 
                this.employeeService.create( action ).pipe(
                    map(( value ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.createEmployeeSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    employee$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.EMPLOYEE ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.id ),
            switchMap(( action: string ) => 
                this.employeeService.findOne( action ).pipe(
                    map(( value ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.getEmployeeSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );
    
    employees$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.EMPLOYEES ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.queries ),
            switchMap(( action: any ) => 
                this.employeeService.findAll( action ).pipe(
                    map(( value ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.getEmployeesSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.DELETE_EMPLOYEE ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.id ),
            switchMap(( action: string ) => 
                this.employeeService.delete( action ).pipe(
                    map(() => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.deleteEmployeeSuccess()
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    createBeneficiary$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.CREATE_BENEFICIARY ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.form ),
            switchMap(( action: CreateBeneficiaryModel ) => 
                this.beneficiaryService.create( action ).pipe(
                    map(( value ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.createBeneficiarySuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    beneficiary$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.BENEFICIARY ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.id ),
            switchMap(( action: string ) => 
                this.beneficiaryService.findOne( action ).pipe(
                    map(( value ) => {
                        return actions.getBeneficiarySuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    beneficiaries$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.BENEFICIARIES ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.queries ),
            switchMap(( action: any ) => 
                this.beneficiaryService.findAll( action ).pipe(
                    map(( value ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.getBeneficiariesSuccess({ res: value })
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );

    deleteBeneficiary$ = createEffect(() =>
        this.actions$.pipe(
            ofType( DashboardActionTypes.DELETE_BENEFICIARY ),
            tap(() => {
                this.uiStore.dispatch( loaderActive() ); 
            }),
            delay(1000),
            map(( action: any ) => action.id ),
            switchMap(( action: string ) => 
                this.beneficiaryService.delete( action ).pipe(
                    map(() => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return actions.deleteBeneficiarySuccess()
                    }),
                    catchError(( error: ErrorModel ) => {
                        this.uiStore.dispatch( loaderInactive() ); 
                        return of( actions.dashboardError({ res: error }));
                    }),
                )
            )
        )
    );
}