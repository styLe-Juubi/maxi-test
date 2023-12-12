import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SelectOption } from 'src/app/shared/interfaces/select-option.interface';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { createBeneficiary, resetBeneficiary, resetCreatedBeneficiary, resetDashboardError } from 'src/app/store/dashboard/core/dashboard.action';
import { selectCreatedBeneficiaryFlag, selectErrorDashboard } from 'src/app/store/dashboard/core/dashboard.selector';
import { DashboardState } from 'src/app/store/dashboard/dashboard.state';

@Component({
  selector: 'app-create-beneficiary',
  templateUrl: './create-beneficiary.component.html',
  styleUrls: ['./create-beneficiary.component.scss']
})
export class CreateBeneficiaryComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  public error$ = this.store.select( selectErrorDashboard );
  public createdFlag$ = this.store.select( selectCreatedBeneficiaryFlag );

  public beneficiaryForm = this.fb.group({
    name: [ null, [ Validators.required, Validators.minLength(5) ]],
    surname: [ null, [ Validators.required, Validators.minLength(5)]],
    birthdate: [ null, [ Validators.required ]],
    curp: [ null, [ Validators.required ]],
    ssn: [ null, [ Validators.required ]],
    phone: [ null, [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    nationality: [ null, [ Validators.required, ]],
    percentage: [ null, [ Validators.required, Validators.min(1), Validators.max(100)]],
    employee: [ null, [ Validators.required, Validators.minLength(24), Validators.maxLength(24) ]],
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
        this.toastrService.success('Se ha registrado exitosamente el beneficiario');
        this.router.navigate(['/dashboard/beneficiary/list']);
        this.store.dispatch( resetCreatedBeneficiary() );
        return;
      }
    });

    /**
     * * Select the error if the user does not enter 
     * * their credentials correctly.
     */
    this.error$.pipe( takeUntil( this.destroy$ )).subscribe(( value ) => {

      ( value ) &&
        this.handleError( value );
    })
  }

  sendForm(): void {

    if ( this.beneficiaryForm.invalid ) return;
    const form: any = this.beneficiaryForm.getRawValue();

    this.store.dispatch( createBeneficiary({ form }));
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
    
    this.beneficiaryForm.controls['employee'].setErrors({ 'incorrect': true });
  }

  ngOnDestroy(): void {
    this.store.dispatch( resetBeneficiary() );
    this.destroy$.next();
    this.destroy$.complete();
  }

}
