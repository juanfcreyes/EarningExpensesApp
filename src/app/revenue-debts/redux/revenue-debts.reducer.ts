import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { RevenueDebts } from "src/app/models/revenue-debts.model";
import { setRDs, setActiveRD, cleanActiveRD } from './revenue-debts.actions';

export interface RDState {
    items: RevenueDebts[];
    active: RevenueDebts;
}

export interface RDAppState extends AppState {
    rds: RDState;
}

export const initState: RDState = {
    items: [],
    active: null
}

const selectRDs = (state: RDAppState) => state.rds;

export const selectRDsItems = createSelector(
    selectRDs, (state: RDState) => state.items
)

export const selectActiveRd = createSelector(
    selectRDs, (state: RDState) => state.active
)

const _rdsReducer = createReducer(
    initState,
    on(setRDs, (state, { rds }) => ({ ...state, items: [...rds] })),
    on(setActiveRD, (state, { rd }) => ({ ...state, active: { ...rd } })),
    on(cleanActiveRD, (state) => ({ ...state, active: null }))
);

export const rdsReducer = (state: RDState | undefined, action: Action) => {
    return _rdsReducer(state, action);
}

