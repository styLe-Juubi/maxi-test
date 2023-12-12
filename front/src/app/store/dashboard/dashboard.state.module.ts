import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { dashboardFeatureName } from './dashboard.state';
import { dashboardReducer } from './core/dasboard.reducer';
import { DashboardEffects } from './core/dashboard.effects';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { BeneficiaryService } from 'src/app/shared/services/beneficiary.service';

@NgModule({
    imports: [
      HttpClientModule,
      StoreModule.forFeature( dashboardFeatureName, dashboardReducer ),
      EffectsModule.forFeature([ DashboardEffects ]),
    ],
    providers: [
      EmployeeService,
      BeneficiaryService,
    ]
})
export class DashbaordStateModule {}