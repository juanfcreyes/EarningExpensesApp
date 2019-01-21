import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DetailComponent } from './detail/detail.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EearningsExpensesComponent } from './earnings-expenses.component';

import { OrderEarningExpensePipe } from './order-earning-expense.pipe';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { earningExpenseReducer } from './earning-expenses.reducer';


@NgModule({
	declarations: [
		DetailComponent,
		StatisticComponent,
		DashboardComponent,
        EearningsExpensesComponent,
        OrderEarningExpensePipe
	],
	imports: [
		CommonModule,
		ChartsModule,
		SharedModule,
		ReactiveFormsModule,
		DashboardRoutingModule,
		StoreModule.forFeature('earningExpense', earningExpenseReducer)
	]
})
export class EarningsExpensesModule { }
