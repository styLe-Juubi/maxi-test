import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from 'src/app/store/auth/auth.state';
import { login, resetAuthError } from 'src/app/store/auth/core/auth.action';
import { selectErrorAuth } from 'src/app/store/auth/core/auth.selector';
import { LoginModel } from 'src/app/store/auth/models';
import { ErrorModel } from 'src/app/shared/models/error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public error$ = new Subscription();
  public loginType: string = 'email';
  public loginForm: FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AuthState>,
    private readonly toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    /**
     * * Select the error if the user does not enter 
     * * their credentials correctly.
     */
    this.error$ = this.store.pipe(
      select( selectErrorAuth )
    ).subscribe(( error ) => {
      
      if ( error ) {
        this.handleError( error );
        this.store.dispatch( resetAuthError() );
      }

    });
  }

  login(): void {

    this.store.dispatch( 
      login({ 
        form: this.loginForm.getRawValue() as LoginModel
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
    
    this.loginForm.controls['email'].setErrors({ 'incorrect': true });
    this.loginForm.controls['password'].setErrors({ 'incorrect': true });
  }

  ngOnDestroy(): void {
    this.error$.unsubscribe();
  }

}
