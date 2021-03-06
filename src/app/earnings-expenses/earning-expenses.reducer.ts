import { EarningsExpenses } from '../models/earnings-expenses.model';
import { UnionItemActions, SET_ITMES, CLEAN_ITEMS } from './earnings-expenses.actions';
import { AppState } from '../app.reducer';

export interface EarningExpenseState {
    items: EarningsExpenses [];
}

export interface EarningExpenseAppState extends AppState {
    earningExpense: EarningExpenseState;
}

export const initState: EarningExpenseState = {
    items: []
}

export function earningExpenseReducer(state = initState, 
    action: UnionItemActions): EarningExpenseState {

        switch (action.type) {
            case SET_ITMES: {
                return { items: action.items.map( item => {
                    return { ...item }
                })};
            }
            case CLEAN_ITEMS: {
                return { items: [] };
            }
            default: {
                return state;
            }
        }
}