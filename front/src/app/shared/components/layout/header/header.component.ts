import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from 'src/app/store/auth/auth.state';
import { logout } from 'src/app/store/auth/core/auth.action';
import { selectUserAuth } from 'src/app/store/auth/core/auth.selector';
import { UiState } from 'src/app/store/ui/ui.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user$ = this.authStore.select( selectUserAuth );
  
  constructor(
    private readonly router: Router,
    private readonly authStore: Store<AuthState>,
    private readonly uiStore: Store<UiState>,
    private readonly toastrService: ToastrService,
  ) {}


  logout(): void {
    this.authStore.dispatch( logout() );
    this.router.navigate(['/auth']);
  }

  

}
