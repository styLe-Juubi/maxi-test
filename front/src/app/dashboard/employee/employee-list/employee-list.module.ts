import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from 'src/app/shared/components/atoms/atoms.module';
import { TableComponent } from 'src/app/shared/components/standalone/table/table.component';
import { LetDirective } from '@ngrx/component';



@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: EmployeeListComponent,
    }]),
    AtomsModule,
    TableComponent,
    LetDirective,
  ]
})
export class EmployeeListModule { }
