import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./beneficiary-list/beneficiary-list.module')
      .then(m => m.BeneficiaryListModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./create-beneficiary/create-beneficiary.module')
      .then(m => m.CreateBeneficiaryModule),
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
export class BeneficiaryRoutingModule { }