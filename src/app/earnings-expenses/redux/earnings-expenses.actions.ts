import { Action } from '@ngrx/store';
import { EarningsExpenses } from '../../models/earnings-expenses.model';

export const SET_ITMES = '[Ingreso Egreso] Set Items';
export const CLEAN_ITEMS = '[Ingreso Egreso] Clean Items';
export const SET_DETAILS = '[Ingreso Egreso] Set Details';
export const SEARCH_DETAILS = '[Ingreso Egreso] Search Details';

export class SetItemAction implements Action {
    readonly type = SET_ITMES;
    constructor(public items: EarningsExpenses []) {}
}

export class CleanItemsAction implements Action {
    readonly type = CLEAN_ITEMS;
}

export class SetDetails implements Action {
  readonly type = SET_DETAILS;
  constructor(public details: EarningsExpenses []) {}
}

export class SearchDetails implements Action {
  readonly type = SEARCH_DETAILS;
  constructor(public filter: any) {}
}


export type  UnionItemActions = SetItemAction | CleanItemsAction | SetDetails | SearchDetails;
