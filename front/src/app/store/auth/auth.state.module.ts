import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeatureName } from './auth.state';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import { authReducer } from './core/auth.reducer';
import { AuthEffects } from './core/auth.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
      HttpClientModule,
      StoreModule.forFeature( authFeatureName, authReducer ),
      EffectsModule.forFeature([ AuthEffects ]),
    ],
    providers: [AuthService],
  })
  export class AuthStateModule {}