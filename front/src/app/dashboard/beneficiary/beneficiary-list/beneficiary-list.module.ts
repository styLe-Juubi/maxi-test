import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryListComponent } from './beneficiary-list.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/shared/components/atoms/atoms.module';
import { TableComponent } from 'src/app/shared/components/standalone/table/table.component';
import { LetDirective } from '@ngrx/component';



@NgModule({
  declarations: [
    BeneficiaryListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: BeneficiaryListComponent,
    }]),
    AtomsModule,
    TableComponent,
    LetDirective,
  ]
})
export class BeneficiaryListModule { }
