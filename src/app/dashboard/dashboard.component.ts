import { Component, OnInit } from '@angular/core';
import { EarningsExpensesService } from '../earnings-expenses/earnings-expenses.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent implements OnInit {

	constructor(public earningExpenseService: EarningsExpensesService) { }

	ngOnInit() {
		this.earningExpenseService.initEarningExpenseListener();
	}

}
