import { Routes } from '@angular/router';
import { StatisticComponent } from '../earnings-expenses/statistic/statistic.component';
import { EearningsExpensesComponent } from '../earnings-expenses/earnings-expenses.component';
import { DetailComponent } from '../earnings-expenses/detail/detail.component';

export const DASHBOARD_ROUTES: Routes = [
    { path: '', component: StatisticComponent},
    { path: 'ingreso-egreso', component: EearningsExpensesComponent },
    { path: 'detalle', component: DetailComponent}
]
