import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { tap, map, switchMap, withLatestFrom, mergeMap } from "rxjs/operators";
import { EarningsExpensesService } from "../services/earnings-expenses.service";
import { SEARCH_DETAILS, SetDetails, SearchDetails } from './earnings-expenses.actions';
import { from } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState, selectUser } from "src/app/app.reducer";


@Injectable()
export class EarningsExpensesEffects {

  searchDetails$ = createEffect(() => this.actions$.pipe(
    ofType(SEARCH_DETAILS),
    withLatestFrom(this.store.select(selectUser)),
    mergeMap(( [_action , user] ) => {
      const action = _action as SearchDetails; 
      return from(this.earningsExpensesService.loadItemsByFilter(action.filter, user))
      .pipe(map(data => new SetDetails(data)))
    }
  )));


  constructor(private actions$: Actions,
    private store: Store<AppState>,
    private earningsExpensesService: EarningsExpensesService) {
  }

}
