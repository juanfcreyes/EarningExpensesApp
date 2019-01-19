import { Action } from '@ngrx/store';

export const SHOW_LOADING = '[UI Loading] Cargando...';
export const HIDE_LOADING = '[UI Loading] Fin de carga...';

export class ShowLoadingAction implements Action {
    readonly type = SHOW_LOADING;
}

export class HideLoadingAction implements Action {
    readonly type = HIDE_LOADING;
}

export type UnionLoadignAction = ShowLoadingAction | HideLoadingAction;
