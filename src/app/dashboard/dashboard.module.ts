import { EarningsExpensesModule } from './../earnings-expenses/earnings-expenses.module';
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RevenueDebtsModule } from '../revenue-debts/revenue-debts.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    RevenueDebtsModule,
    EarningsExpensesModule,
  ],
  providers: []
})
export class DashboardModule {}
