import { Component, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from './store/auth/auth.state';
import { checkStatus, checkStatusResetError } from './store/auth/core/auth.action';
import { selectCheckStatusErrorAuth } from './store/auth/core/auth.selector';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <app-loader></app-loader>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly themeService: ThemeService,
    private readonly store: Store<AuthState>,
    private readonly authService: AuthService,
  ) { 

    themeService.getTheme();
    const token = authService.getToken();
    const user = authService.getUser();
    (
      ( token && token !== '' ) &&
      ( user && user !== '' )
    ) && 
      store.dispatch( checkStatus() );
  }

  ngOnInit(): void {
    this.store.pipe(
      select( selectCheckStatusErrorAuth )
    ).subscribe(( error ) => {
      
      ( error ) &&
        this.store.dispatch( checkStatusResetError() );
    });
  }
}