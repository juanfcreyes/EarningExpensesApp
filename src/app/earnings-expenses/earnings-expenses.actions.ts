import { Action } from '@ngrx/store';
import { EarningsExpenses } from '../models/earnings-expenses.model';

export const SET_ITMES = '[Ingreso Egreso] Set Items';
export const CLEAN_ITEMS = '[Ingreso Egreso] Clean Items'

export class SetItemAction implements Action {
    readonly type = SET_ITMES;
    constructor(public items: EarningsExpenses []) {}
}

export class CleanItemsAction implements Action {
    readonly type = CLEAN_ITEMS;
}

export type  UnionItemActions = SetItemAction | CleanItemsAction;  