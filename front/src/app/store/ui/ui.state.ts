export const uiFeatureName = 'UI';

export interface UiState {
    loader?: boolean;
    sidebar?: boolean;
    themeList?: boolean;
    filters?: boolean;
}

export const initialUiState: UiState = {
    loader: undefined,
    sidebar: undefined,
    themeList: undefined,
    filters: undefined,
}