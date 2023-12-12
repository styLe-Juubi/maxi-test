import { Action, createReducer, on } from "@ngrx/store";
import { UiState, initialUiState } from "../ui.state";
import * as actions from './ui.action';

const _uiReducer = createReducer(
    initialUiState,
    // Loader
    on( actions.loaderActive, state => ({ ...state, loader: true })),
    on( actions.loaderInactive, state => ({ ...state, loader: false })),
    // Sidebar
    on( actions.sidebarActive, state => ({ ...state, sidebar: true })),
    on( actions.sidebarInactive, state => ({ ...state, sidebar: false })),
    on( actions.sidebarManualValue, ( state, { active }) => ({ 
        ...state, sidebar: active
    })),
    // Theme List
    on( actions.themeListActive, state => ({ ...state, themeList: true })),
    on( actions.themeListInactive, state => ({ ...state, themeList: false })),
    // Customer Filters
    on( actions.filtersActive, state => ({ ...state, filters: true })),
    on( actions.filtersInactive, state => ({ ...state, filters: false })),
    on( actions.filtersManualValue, ( state, { active }) => ({ 
        ...state, filters: active
    })),
);

export function uiReducer(
    state: UiState | undefined,
    action: Action,
) {
    return _uiReducer( state, action );
}