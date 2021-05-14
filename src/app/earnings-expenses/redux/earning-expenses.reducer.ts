import { EarningsExpenses } from '../../models/earnings-expenses.model';
import { UnionItemActions, SET_ITMES, CLEAN_ITEMS, SET_DETAILS } from './earnings-expenses.actions';
import { AppState } from '../../app.reducer';
import { createSelector } from '@ngrx/store';

export interface EarningExpenseState {
    items: EarningsExpenses [];
    details: EarningsExpenses [];
}

export interface EarningExpenseAppState extends AppState {
    earningExpense: EarningExpenseState;
}

export const initState: EarningExpenseState = {
    items: [],
    details: [],
}

const selectEarningExpense = (state: EarningExpenseAppState) => state.earningExpense

export const selectItems = createSelector(
  selectEarningExpense, (state: EarningExpenseState) => state.items
)

export const selectDetails = createSelector(
  selectEarningExpense, (state: EarningExpenseState) => state.details
)

export function earningExpenseReducer(state = initState,
    action: UnionItemActions): EarningExpenseState {
        switch (action.type) {
            case SET_ITMES: {
                return {...state,  items: action.items.map( item => {
                    return { ...item }
                })};
            }
            case CLEAN_ITEMS: {
                return { ...state, items: [] };
            }
            case SET_DETAILS: {
              return { ...state, details: action.details.map( detail => {
                return { ...detail }
            })};
          }
            default: {
                return state;
            }
        }
}
