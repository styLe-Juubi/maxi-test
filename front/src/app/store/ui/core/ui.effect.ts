import { ElementRef, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UiActionTypes } from './ui.action';
import { AnimateService } from "src/app/shared/services/animate.service";
import { map } from "rxjs";
import { SidebarTypeModel, SidebarTypes } from "../models/sidebar-type.model";
import { FiltersTypeModel, FiltersTypes } from "../models/customer-options-type.model";

@Injectable()
export class UiEffects {
    
    constructor(
        private readonly actions$: Actions,
        private readonly animateService: AnimateService,
    ) {}

    /**
     * @loader Effects
     */
    loaderActive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.LOADER_ACTIVE ),
        ), { dispatch: false }
    );

    loaderInactive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.LOADER_INACTIVE ),
        ), { dispatch: false }
    );

    /**
     * @sidebar Effects
     */
    sidebarActive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.SIDEBAR_ACTIVE ),
            map(( action: any ) => action.sidebar ),
            map(( sidebar: SidebarTypeModel ) => {
                this.toggleSidebarType( sidebar, true );
            })
        ), { dispatch: false }
    );

    sidebarInctive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.SIDEBAR_INACTIVE ),
            map(( action: any ) => action.sidebar ),
            map(( sidebar: SidebarTypeModel ) => {
                this.toggleSidebarType( sidebar, false );
            })
        ), { dispatch: false }
    );

    /**
     * @themeList
     */
    themeListActive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.THEMELIST_ACTIVE ),
            map(( action: any ) => action.themeList ),
            map(( themeList: ElementRef ) => {
              
                this.animateService.toggleAnimation(
                    themeList.nativeElement, true,
                    'height', '0px', '300px', 0
                );

                this.animateService.toggleAnimation(
                    themeList.nativeElement, true,
                    'opacity','0','1', 300,
                );
            })
        ), { dispatch: false }
    );

    themeListInactive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.THEMELIST_INACTIVE ),
            map(( action: any ) => action.themeList ),
            map(( themeList: ElementRef ) => {
              
                this.animateService.toggleAnimation(
                    themeList.nativeElement, false,
                    'opacity','0','1', 300,
                );

                setTimeout(() => {
                    this.animateService.toggleAnimation(
                        themeList.nativeElement, false,
                        'height', '0px', '300px', 0
                    );
                }, 301);
            })
        ), { dispatch: false }
    );


    /**
     * @filters Effects
     */
    filtersActive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.FILTERS_ACTIVE ),
            map(( action: any ) => action.filters ),
            map(( filters: FiltersTypeModel ) => {

                this.toggleFiltersType(filters, true);
            })
        ), { dispatch: false }
    );

    filtersInactive$ = createEffect(() => 
        this.actions$.pipe(
            ofType( UiActionTypes.FILTERS_INACTIVE ),
            map(( action: any ) => action.filters ),
            map(( filters: FiltersTypeModel ) => {
                
                this.toggleFiltersType(filters, false);
            })
        ), { dispatch: false }
    );

    protected toggleFiltersType(
        filters: FiltersTypeModel,
        show: boolean,
    ): void {
        if ( show ) {

            if ( filters.type === FiltersTypes.adminHeader ) {
                this.animateService.toggleAnimation(
                    filters.value.nativeElement, show,
                    'height', '0px', '450px', 0
                );
                this.animateService.toggleAnimation(
                    filters.value.nativeElement, show,
                    'overflow', 'hidden', 'visible', 0
                );
                this.animateService.toggleAnimation(
                    filters.value.nativeElement, show,
                    'opacity', '0', '1', 300
                );
            }
        } else {

            if ( filters.type === FiltersTypes.adminHeader ) { 
                this.animateService.toggleAnimation(
                    filters.value.nativeElement, show,
                    'overflow', 'hidden', 'visible', 0
                );
                this.animateService.toggleAnimation(
                    filters.value.nativeElement, show,
                    'opacity', '0', '1', 300
                );
                setTimeout(() => {
                    this.animateService.toggleAnimation(
                        filters.value.nativeElement, show,
                        'height', '0px', '450px', 0
                    );
                }, 301);
            }
        }
    }

    protected toggleSidebarType( 
        sidebar: SidebarTypeModel,
        show: boolean,
    ): void {
        
        if ( show ) {

            if ( sidebar.type === SidebarTypes.page ) {
                this.animateService.toggleAnimation(
                    sidebar.value.nativeElement, true,
                    'left','-250px','0px', 300,
                );
            }

            if ( sidebar.type === SidebarTypes.admin ) {
                this.animateService.toggleAnimation(
                    sidebar.value.nativeElement, true,
                    'width','80px','250px', 300,
                );
            }
        } else {

            if ( sidebar.type === SidebarTypes.page ) {
                this.animateService.toggleAnimation(
                    sidebar.value.nativeElement, false,
                    'left','-250px','0px', 300,
                );
            }

            if ( sidebar.type === SidebarTypes.admin ) {
                this.animateService.toggleAnimation(
                    sidebar.value.nativeElement, false,
                    'width','80px','250px', 300,
                );
            }
        }
    }
}