import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { EarningsExpenses } from 'src/app/models/earnings-expenses.model';
import { EarningExpenseAppState } from '../../redux/earning-expenses.reducer';

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styles: []
})
export class StatisticComponent implements OnInit {

	earnings: number;
	expenses: number;
	numberOfEarnings: number;
	numberOfExpenses: number;
	doughnutChartLabels:string[] = ['Ingresos', 'Egresos'];
	doughnutChartData:number[] = [];
	subscription: Subscription = new Subscription();

	constructor(private store: Store<EarningExpenseAppState>) { }

	ngOnInit() {
		this.subscription = this.store.select('earningExpense')
		.subscribe((earningExpense) => {
			this.countMovement(earningExpense.items);
		});
	}

	initializeCounters() {
		this.earnings = 0;
		this.expenses = 0;
		this.numberOfEarnings = 0;
		this.numberOfExpenses = 0;
	}

	countMovement(items: EarningsExpenses[]) {
		this.initializeCounters();
		for(const item of items) {
			if (item.type === 'ingreso') {
				this.numberOfEarnings++;
				this.earnings += item.amount;
			} else {
				this.numberOfExpenses++;
				this.expenses += item.amount;
			}
		}
		this.doughnutChartData = [this.earnings, this.expenses];
	}

}
