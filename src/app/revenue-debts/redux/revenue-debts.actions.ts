import { createAction, props } from '@ngrx/store';
import { RDMovement } from 'src/app/models/rd-movement.model';
import { RevenueDebts } from 'src/app/models/revenue-debts.model';

export const loadRDs = createAction('[Revenue Debts] Load');
export const setRDs = createAction('[Revenue Debts] Set', props<{ rds: RevenueDebts[] }>());
export const saveRD = createAction('[Revenue Debts] Save', props<{ rd: RevenueDebts }>());
export const deleteRD = createAction('[Revenue Debts] Delete', props<{ uid: string }>());
export const setActiveRD = createAction('[Revenue Debts] Active', props<{ rd: RevenueDebts }>());
export const cleanActiveRD = createAction('[Revenue Debts] Clean Active');
export const addRDMovement = createAction('[Revenue Debts] Add RD movement', props<{movement: RDMovement}>());
