import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DASHBOARD_ROUTES } from './dashboard/dashboard.routes';
import { AuthGuard } from './auth/auth.guard';

const ROUTERS: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: DashboardComponent,
        children: DASHBOARD_ROUTES,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTERS)
    ], exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }