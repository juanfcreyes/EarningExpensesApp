import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EarningsExpenses } from 'src/app/models/earnings-expenses.model';
import { Subscription } from 'rxjs';
import { EarningsExpensesService } from '../earnings-expenses.service';
import swal from 'sweetalert2';
import { EarningExpenseAppState } from '../earning-expenses.reducer';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

	subscription: Subscription = new Subscription();
	items: EarningsExpenses [];

	constructor(private store: Store<EarningExpenseAppState>, 
		private earningExpenseService: EarningsExpensesService) { }

	ngOnInit() {
		this.subscription = this.store.select('earningExpense')
		.subscribe((earningExpense) => {
			this.items = earningExpense.items;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	deleteItem(item: EarningsExpenses) {
		this.earningExpenseService.deleteItem(item.uid)
		.then(() => {
			swal('Eliminado', item.description, 'success');
		});
	}

}
