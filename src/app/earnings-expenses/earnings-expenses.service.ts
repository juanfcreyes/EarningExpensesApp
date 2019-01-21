import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EarningsExpenses } from '../models/earnings-expenses.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import { filter, map } from 'rxjs/operators';
import { SetItemAction, CleanItemsAction } from './earnings-expenses.actions';
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EarningsExpensesService {

	user: User;
	listenerSubscription: Subscription = new Subscription();
	itemsSubscription: Subscription = new Subscription();

	constructor(private angularFireDB: AngularFirestore,
		private store: Store<AppState>) { }

	initEarningExpenseListener() {
		this.listenerSubscription = this.store.select('auth').pipe(
			filter( auth => auth.user !== null )
			).subscribe(auth => {
				this.user = auth.user;
				this.loadItems();
			})
	}

	private loadItems() {
		this.itemsSubscription = this.angularFireDB
		.collection(`${this.getUrlItem()}`)
		.snapshotChanges().pipe(this.mapCollection())
		.subscribe((items:any[]) => {
			this.store.dispatch(new SetItemAction(items));
		});
	}

	private mapCollection() {
		return map((data: any[]) => {
			return data.map( doc => {
				return {
					uid: doc.payload.doc.id,
					...doc.payload.doc.data()
				};
			});
		})
	}

	createItem(item: EarningsExpenses) {
		return this.angularFireDB
		.doc(this.getUrl())
		.collection('items').add({...item})
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
