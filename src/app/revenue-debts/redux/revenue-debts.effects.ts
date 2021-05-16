import { RevenuesDebtsService } from './../services/revenues-debts.service';
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, withLatestFrom, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { selectUser } from "src/app/app.reducer";
import { loadRDs, saveRD, setRDs, deleteRD, addRDMovement } from './revenue-debts.actions';
import { from } from 'rxjs';
import { RDAppState } from './revenue-debts.reducer';
import { EarningsExpensesService } from '../../earnings-expenses/services/earnings-expenses.service';
import { movementTypes, rdStatus } from '../../models/types';
import { EarningsExpenses } from 'src/app/models/earnings-expenses.model';
import { discharged, pending } from 'src/app/models/constants';
import { HideLoadingAction } from '../../shared/ui.actions';

@Injectable()
export class RevenueDebtsEffects {

    searchRDs$ = createEffect(() => this.actions$.pipe(
        ofType(loadRDs),
        withLatestFrom(this.store.select(selectUser)),
        mergeMap(([_, user]) => this.revenuesDebtsService.loadRDs(user)
            .pipe(map((data: any) => setRDs({ rds: data })))
        )));

    addRDs$ = createEffect(() => this.actions$.pipe(
        ofType(saveRD),
        withLatestFrom(this.store.select(selectUser)),
        mergeMap(([action, user]) =>
            from(this.revenuesDebtsService.saveRD(user, action.rd))
        )), { dispatch: false });


    deleteRDs$ = createEffect(() => this.actions$.pipe(
        ofType(deleteRD),
        withLatestFrom(this.store.select(selectUser)),
        mergeMap(([action, user]) =>
            from(this.revenuesDebtsService.deleteRD(user, action.uid))
        )), { dispatch: false });

    addRDMovement$ = createEffect(() => this.actions$.pipe(
        ofType(addRDMovement),
        withLatestFrom(this.store),
        mergeMap(([action, store]) => {
            const { user } = store.auth;
            const { active } = store.rds;
            return from(this.revenuesDebtsService
                .saveRDMovement(user, active.uid, action.movement))
                .pipe(map(() => {
                    const {movement} = action;
                    const newAmount = (active.amount - movement.amount);
                    const status = newAmount === 0 ? rdStatus.discharged : rdStatus.pending;
                    this.revenuesDebtsService.updateRD(user, { ...active, amount:newAmount, status: status  });
                    if (movement.createMovement) {
                        this.earningsExpensesService
                        .createItem(new EarningsExpenses(active.description, movement.amount,
                         movementTypes[active.type], new Date()))
                    }
                })).pipe(map(() => new HideLoadingAction()));
        }
        )));

    constructor(private actions$: Actions,
        private store: Store<RDAppState>,
        private revenuesDebtsService: RevenuesDebtsService,
        private earningsExpensesService: EarningsExpensesService) {
    }

}
