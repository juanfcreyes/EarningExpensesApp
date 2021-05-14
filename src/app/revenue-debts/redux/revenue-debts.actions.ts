import { createAction, props } from '@ngrx/store';
import { RevenueDebts } from 'src/app/models/revenue-debts.model';

export const loadRDs = createAction('[Revenue Debts] Load');
export const setRDs = createAction('[Revenue Debts] Set', props<{ rds: RevenueDebts[] }>());
export const saveRD = createAction('[Revenue Debts] Save', props<{ rd: RevenueDebts }>());
export const deleteRD = createAction('[Revenue Debts] Delete', props<{ uid: String }>());
export const addRD = createAction('[Revenue Debts] Add', props<{ rd: RevenueDebts }>());
