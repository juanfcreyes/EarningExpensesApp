import { RevenuesDebtsService } from './../services/revenues-debts.service';
import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, withLatestFrom, mergeMap, concatMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState, selectUser } from "src/app/app.reducer";
import { loadRDs, saveRD, setRDs, addRD } from './revenue-debts.actions';
import { from } from 'rxjs';


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
        .pipe(map(() => addRD({ rd: action.rd })))
    )));


  deleteRDs$ = createEffect(() => this.actions$.pipe(
    ofType(saveRD),
    withLatestFrom(this.store.select(selectUser)),
    mergeMap(([action, user]) =>
      from(this.revenuesDebtsService.saveRD(user, action.rd))
        .pipe(map(() => addRD({ rd: action.rd })))
    )));

  constructor(private actions$: Actions,
    private store: Store<AppState>,
    private revenuesDebtsService: RevenuesDebtsService) {
  }

}
