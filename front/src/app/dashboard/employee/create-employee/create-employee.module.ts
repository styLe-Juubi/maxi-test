import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEmployeeComponent } from './create-employee.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from 'src/app/shared/components/atoms/atoms.module';



@NgModule({
  declarations: [
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: CreateEmployeeComponent,
    }]),
    ReactiveFormsModule,
    AtomsModule,
  ]
})
export class CreateEmployeeModule { }
