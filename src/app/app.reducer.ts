import { State as UIState, uiReducer } from './shared/ui.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: UIState;
    auth: AuthState
}

export const appReducers : ActionReducerMap<AppState> = {
    ui: uiReducer,
    auth: authReducer,
}