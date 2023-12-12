import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/shared/components/atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
    ]),
    ReactiveFormsModule,
    AtomsModule,
  ]
})
export class LoginModule { }
