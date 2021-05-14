import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { RevenueDebts } from "src/app/models/revenue-debts.model";
import { addRD, setRDs } from "./revenue-debts.actions";

export interface RDState {
  items: RevenueDebts[];
}

export interface RDAppState extends AppState {
  rds: RDState;
}

export const initState: RDState = {
  items: []
}

const selectRDs = (state: RDAppState) => state.rds;

export const selectRDsItems = createSelector(
  selectRDs, (state: RDState) => state.items
)

const _rdsReducer = createReducer(
  initState,
  on(setRDs, (state, { rds }) => ({ ...state, items: [...rds] })),
  on(addRD, (state, { rd }) => ({ ...state, items: [...state.items, rd] }))
);

export const rdsReducer = (state: RDState | undefined, action: Action) => {
  return _rdsReducer(state, action);
}

