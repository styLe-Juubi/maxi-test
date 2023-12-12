import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs';
import { AnimateService } from 'src/app/shared/services/animate.service';
import { AuthState } from 'src/app/store/auth/auth.state';
import { logout } from 'src/app/store/auth/core/auth.action';
import { selectUserAuth } from 'src/app/store/auth/core/auth.selector';
import { sidebarActive, sidebarInactive } from 'src/app/store/ui/core/ui.action';
import { selectSidebar } from 'src/app/store/ui/core/ui.selector';
import { SidebarTypes } from 'src/app/store/ui/models/sidebar-type.model';
import { UiState } from 'src/app/store/ui/ui.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  
  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;
  public activeSidebar$ = this.uiStore.pipe( select( selectSidebar ));
  public user$ = this.store.pipe(select( selectUserAuth ));
  public searchForm = this.fb.group({
    search: ['', [ 
      Validators.required, 
      Validators.minLength(1),
      Validators.maxLength(50),
    ]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly animateService: AnimateService,
    private readonly store: Store<AuthState>,
    private readonly uiStore: Store<UiState>,
  ) {}

  @HostListener(
    'click', ['$event']
  ) onClick( e: any ): void {
    if ( e.target.getAttribute('anim') === 'ripple' ) {
      this.animateService.rippleEffect( e, e.target );
    }
    if ( e.target.parentNode.getAttribute('anim') === 'ripple' ) {
      this.animateService.rippleEffect( e, e.target.parentNode );
    }
  }

  @HostListener(
    'document:keydown.escape', ['$event']
  ) onKeydownHandler(event: KeyboardEvent) {
      
    this.activeSidebar$.pipe( take(1) ).subscribe(
      ( value ) => ( value ) && this.uiStore.dispatch(
        sidebarInactive({ sidebar: {
          value: this.sidebar,
          type: SidebarTypes.page,
        }}),
      )
    );
  }

  toggleSidebar( show: boolean ): void {
    if ( show ) {

      this.uiStore.dispatch( 
        sidebarActive({ sidebar: {
          value: this.sidebar,
          type: SidebarTypes.page,
        }}),
      );
    } else {

      this.uiStore.dispatch( 
        sidebarInactive({ sidebar: {
          value: this.sidebar,
          type: SidebarTypes.page,
        }}),
      );
    }
    
  }

  logout(): void {
    this.store.dispatch( logout() );
  }

}
