import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./employee-list/employee-list.module')
      .then(m => m.EmployeeListModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./create-employee/create-employee.module')
      .then(m => m.CreateEmployeeModule),
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }