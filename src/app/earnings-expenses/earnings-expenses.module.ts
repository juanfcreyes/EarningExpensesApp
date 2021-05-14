import { EarningsExpensesEffects } from './redux/earnings-expenses.effects';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardRoutingModule } from "../dashboard/dashboard-routing.module";

import { DetailComponent } from "./components/detail/detail.component";
import { StatisticComponent } from "./components/statistic/statistic.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { EearningsExpensesComponent } from "./earnings-expenses.component";

import { OrderEarningExpensePipe } from "./helpers/order-earning-expense.pipe";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { earningExpenseReducer } from "./redux/earning-expenses.reducer";
import { RevenueDebtsComponent } from "../revenue-debts/revenue-debts.component";
import { AccountsComponent } from "../accounts/accounts.component";
import { ProjectionsComponent } from "../projections/projections.component";
import { RVDetailsComponent } from "../revenue-debts/rv-details/rv-details.component";
import { RvFormComponent } from "../revenue-debts/rv-form/rv-form.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [
    DetailComponent,
    StatisticComponent,
    EearningsExpensesComponent,
    OrderEarningExpensePipe
  ],
  exports: [
    DetailComponent,
    StatisticComponent,
    EearningsExpensesComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("earningExpense", earningExpenseReducer),
    EffectsModule.forFeature([EarningsExpensesEffects])
  ],
})
export class EarningsExpensesModule {}
