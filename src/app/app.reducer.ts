import { State as UIState, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface AppState {
  ui: UIState;
  auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
}

export const selectAuth = (state: AppState) => state.auth;

export const selectUi = (state: AppState) => state.ui;

export const selectUser = createSelector(
  selectAuth, (state: AuthState) => state.user
);

export const selectLoading = createSelector(
    selectUi, (state: UIState) => state.isLoading
  );
