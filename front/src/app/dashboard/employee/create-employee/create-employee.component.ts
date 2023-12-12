import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SelectOption } from 'src/app/shared/interfaces/select-option.interface';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { createEmployee, resetDashboardError, resetEmployee } from 'src/app/store/dashboard/core/dashboard.action';
import { selectErrorDashboard } from 'src/app/store/dashboard/core/dashboard.selector';
import { DashboardState } from 'src/app/store/dashboard/dashboard.state';
import { CreateEmployeeModel } from 'src/app/store/dashboard/models/create-employee.model';
import { selectCreatedEmployeeFlag } from '../../../store/dashboard/core/dashboard.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  public error$ = new Subscription();
  private destroy$ = new Subject<void>();
  public createdFlag$ = this.store.select( selectCreatedEmployeeFlag );

  public employeeForm = this.fb.group({
    name: [ null, [ Validators.required, Validators.minLength(5) ]],
    surname: [ null, [ Validators.required, Validators.minLength(5)]],
    birthdate: [ null, [ Validators.required ]],
    curp: [ null, [ Validators.required ]],
    ssn: [ null, [ Validators.required ]],
    phone: [ null, [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nationality: [ null, [ Validators.required, ]],
  });
  public nationalities: SelectOption[] = [
    { name: 'Mexicana', value: 'Mexicana' },
    { name: 'Estadounidense', value: 'Estadounidense' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store<DashboardState>,
    private readonly toastrService: ToastrService,
  ) {}

  ngOnInit(): void {

    this.createdFlag$.pipe(takeUntil( this.destroy$ )).subscribe(( value: any ) => {

      if ( value ) {
        this.toastrService.success('Se ha registrado exitosamente el empleado !');
        this.router.navigate(['/dashboard/employee/list']);
        return;
      }
    });

    /**
     * * Select the error if the user does not enter 
     * * their credentials correctly.
     */
    this.error$ = this.store.pipe(
      select( selectErrorDashboard )
    ).subscribe(( error ) => {
      
      if ( error ) {
        this.handleError( error );
        this.store.dispatch( resetDashboardError() );
      }

    });
  }

  sendForm(): void {

    if ( this.employeeForm.invalid ) return;
    const form: any = this.employeeForm.getRawValue();

    this.store.dispatch( 
      createEmployee({ 
        form
      })
    );
  }

  handleError( error?: ErrorModel ): void {

    let errorMessage: string | undefined;
    const getErrorMsg = ( error: ErrorModel ) => {

      if ( typeof error.error !== 'string' ) {

        getErrorMsg( error.error );
        return;
      }

      errorMessage = error.message;
    }

    getErrorMsg( error! );
    this.toastrService.info( errorMessage );
    this.setErrorsToAllFields();
  }

  setErrorsToAllFields(): void {
    
    this.employeeForm.controls['name'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['surname'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['birthdate'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['curp'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['ssn'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['phone'].setErrors({ 'incorrect': true });
    this.employeeForm.controls['nationality'].setErrors({ 'incorrect': true });
  }

  ngOnDestroy(): void {
    this.store.dispatch( resetEmployee() );
    this.error$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
