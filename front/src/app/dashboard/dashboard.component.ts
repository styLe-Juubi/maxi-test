import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
    
      <app-sidebar></app-sidebar>

      <app-header></app-header>

      <div class="dashboard-content">
        <router-outlet></router-outlet>
      </div>
      
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // constructor(
  //   private readonly titleService: Title,
  //   private readonly uiStore: Store<UiState>,
  // ) {
  //   this.titleService.setTitle(
  //     'Food App — Encuentra tus negocios favoritos de comida!'
  //   );

  //   this.uiStore.pipe(
  //     take(1), select( selectSidebar ),
  //   ).subscribe(( activeSidebar ) => {
  //     ( activeSidebar ) &&
  //       this.uiStore.dispatch( sidebarManualValue({ active: false }));
  //   });

  //   this.uiStore.pipe(
  //     take(1), select( selectFilters ),
  //   ).subscribe(( activeFilters ) => {
  //     ( activeFilters ) &&
  //       this.uiStore.dispatch( filtersManualValue({ active: false }));
  //   });
  // }

}
