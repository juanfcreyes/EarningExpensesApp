import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EarningsExpenses } from '../models/earnings-expenses.model';
import { EarningsExpensesService } from './services/earnings-expenses.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShowLoadingAction, HideLoadingAction } from '../shared/ui.actions';
import { EarningExpenseAppState } from './redux/earning-expenses.reducer';

@Component({
	selector: 'app-earnings-expenses',
	templateUrl: './earnings-expenses.component.html',
	styles: []
})

export class EearningsExpensesComponent implements OnInit, OnDestroy {

	form: FormGroup;
	type = 'ingreso';
	loading: boolean;
	loadingSubscription: Subscription = new Subscription();

	constructor(private earningsExpensesService: EarningsExpensesService,
		private store: Store<EarningExpenseAppState>) { }

	ngOnInit() {

		this.loadingSubscription = this.store.select('ui')
		.subscribe( ui => this.loading = ui.isLoading);

		this.form = new FormGroup({
			'description': new FormControl('', Validators.required),
			'amount': new FormControl(0, Validators.min(0))
		});
	}

	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}

	saveItem() {
		this.store.dispatch(new ShowLoadingAction());
		const item: EarningsExpenses = {...this.form.value, type: this.type};
		this.earningsExpensesService.createItem(item)
		.then(() => {
			swal.fire('Creado', item.description, 'success');
			this.store.dispatch(new HideLoadingAction());
		});
		this.form.reset({'amount': 0 });

	}


}
