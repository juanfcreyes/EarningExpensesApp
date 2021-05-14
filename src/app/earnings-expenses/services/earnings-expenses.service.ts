import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EarningsExpenses } from '../../models/earnings-expenses.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from '../../models/user.model';
import { filter, map } from 'rxjs/operators';
import { SetItemAction, CleanItemsAction, SetDetails } from '../redux/earnings-expenses.actions';
import { Subscription } from 'rxjs';
import { AuthState } from '../../auth/auth.reducer';
import { AppService } from 'src/app/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class EarningsExpensesService {

  user: User;
  listenerSubscription: Subscription = new Subscription();
  itemsSubscription: Subscription = new Subscription();

  constructor(private angularFireDB: AngularFirestore,
    private store: Store<AppState>,  private appService: AppService) { }

  initEarningExpenseListener() {
    this.listenerSubscription = this.store.select('auth').pipe(
      filter((auth: AuthState) => auth.user !== null)
    ).subscribe(auth => {
      this.user = auth.user;
      this.loadItems();
    })
  }

  private loadItems() {
    this.itemsSubscription = this.angularFireDB
      .collection(`${this.getUrlItem()}`)
      .snapshotChanges().pipe(this.appService.mapCollection())
      .subscribe((items: any[]) => {
        this.store.dispatch(new SetItemAction(items));
      });
  }

  async loadItemsByFilter(filter: any, user: User) {
    let query = this.angularFireDB.firestore.
    collection(`${this.appService.getUrlItemByUser(user)}`).where("date", ">=", filter.start).where("date", "<=", filter.end);
    if (Boolean(filter.type)) {
      query = query.where("type", "==", filter.type);
    }
    const querySnapshot = await query.get();
    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })) as EarningsExpenses[];
  }


  createItem(item: EarningsExpenses) {
    return this.angularFireDB
      .doc(this.getUrl())
      .collection('items').add({ ...item, date: new Date() })
  }

  closeSubscriptions() {
    this.itemsSubscription.unsubscribe();
    this.listenerSubscription.unsubscribe();
    this.store.dispatch(new CleanItemsAction());
  }

  deleteItem(uid: string) {
    return this.angularFireDB
      .doc(`${this.getUrlItem()}/${uid}`)
      .delete();
  }

  private getUrl() {
    return `${this.user.uid}/earning-expenses`
  }

  private getUrlItem() {
    return `${this.user.uid}/earning-expenses/items`;
  }


}
