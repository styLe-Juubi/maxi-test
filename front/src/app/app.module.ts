import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './environments/environment';
import { AuthStateModule } from './store/auth/auth.state.module';
import { UiStateModule } from './store/ui/ui.state.module';
import { LoaderComponent } from './shared/components/standalone/loader/loader.component';
import { DashbaordStateModule } from './store/dashboard/dashboard.state.module';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    AuthStateModule,
    DashbaordStateModule,
    UiStateModule,
    LoaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
