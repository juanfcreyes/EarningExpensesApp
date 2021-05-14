import { Routes } from '@angular/router';
import { StatisticComponent } from '../earnings-expenses/components/statistic/statistic.component';
import { EearningsExpensesComponent } from '../earnings-expenses/earnings-expenses.component';
import { DetailComponent } from '../earnings-expenses/components/detail/detail.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { RevenueDebtsComponent } from '../revenue-debts/revenue-debts.component';
import { ProjectionsComponent } from '../projections/projections.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: '', component: StatisticComponent},
    { path: 'ingreso-egreso', component: EearningsExpensesComponent },
    { path: 'detalle', component: DetailComponent},
    { path: 'cuentas', component: AccountsComponent},
    { path: 'haberes-deberes', component: RevenueDebtsComponent},
    { path: 'proyecciones', component: ProjectionsComponent},
]

