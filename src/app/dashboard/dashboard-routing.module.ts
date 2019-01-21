import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard.routes';
//import { AuthGuard } from '../auth/auth.guard';

const dashboardRoutes: Routes = [
	{
        path: '',
        component: DashboardComponent,
        children: DASHBOARD_ROUTES,
    }
]

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(dashboardRoutes)
	],
	exports: [
		RouterModule
	]
})
export class DashboardRoutingModule { }
