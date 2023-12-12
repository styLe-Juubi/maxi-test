import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBeneficiaryComponent } from './create-beneficiary.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/shared/components/atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: CreateBeneficiaryComponent,
    }]),
    ReactiveFormsModule,
    AtomsModule,
  ]
})
export class CreateBeneficiaryModule { }
