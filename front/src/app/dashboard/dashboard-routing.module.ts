import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module')
          .then(m => m.EmployeeModule),
      },
      {
        path: 'beneficiary',
        loadChildren: () => import('./beneficiary/beneficiary.module')
          .then(m => m.BeneficiaryModule),
      },
      {
        path: '**',
        redirectTo: 'employee/list',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }