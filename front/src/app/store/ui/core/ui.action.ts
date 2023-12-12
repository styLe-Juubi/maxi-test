import { ElementRef } from "@angular/core";
import { createAction, props } from "@ngrx/store";
import { SidebarTypeModel } from "../models/sidebar-type.model";
import { FiltersTypeModel } from '../models/customer-options-type.model';

export enum UiActionTypes {
    LOADER_ACTIVE = '[UI] Loader active',
    LOADER_INACTIVE = '[UI] Loader inactive',

    SIDEBAR_ACTIVE = '[UI] Sidebar active',
    SIDEBAR_INACTIVE = '[UI] Sidebar inactive',
    SIDEBAR_MANUAL_VALUE = '[UI] Sidebar manual value',

    THEMELIST_ACTIVE = '[UI] Theme list active',
    THEMELIST_INACTIVE = '[UI] Theme list inactive',

    FILTERS_ACTIVE = '[UI] Filters active',
    FILTERS_INACTIVE = '[UI] Filters inactive',
    FILTERS_MANUAL_VALUE = '[UI] Filters manual value',
}

/**
 * * Loader Actions
 */
export const loaderActive = createAction(
    UiActionTypes.LOADER_ACTIVE,
);
export const loaderInactive = createAction(
    UiActionTypes.LOADER_INACTIVE,
);

/**
 * * Sidebar Actions
 */
export const sidebarActive = createAction(
    UiActionTypes.SIDEBAR_ACTIVE,
    props<{ sidebar: SidebarTypeModel }>()
);
export const sidebarInactive = createAction(
    UiActionTypes.SIDEBAR_INACTIVE,
    props<{ sidebar: SidebarTypeModel }>()
);
export const sidebarManualValue = createAction(
    UiActionTypes.SIDEBAR_MANUAL_VALUE,
    props<{ active: boolean }>(),
);

/**
 * * Theme List Actions
 */
export const themeListActive = createAction(
    UiActionTypes.THEMELIST_ACTIVE,
    props<{ themeList: ElementRef }>()
);
export const themeListInactive = createAction(
    UiActionTypes.THEMELIST_INACTIVE,
    props<{ themeList: ElementRef }>()
);

/**
 * * Filters Actions
 */
export const filtersActive = createAction(
    UiActionTypes.FILTERS_ACTIVE,
    props<{ filters: FiltersTypeModel }>(),
);
export const filtersInactive = createAction(
    UiActionTypes.FILTERS_INACTIVE,
    props<{ filters: FiltersTypeModel }>(),
);
export const filtersManualValue = createAction(
    UiActionTypes.FILTERS_MANUAL_VALUE,
    props<{ active: boolean }>(),
);
