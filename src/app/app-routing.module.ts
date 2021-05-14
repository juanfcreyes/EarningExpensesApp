import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

// const PATH_MODULE = './earnings-expenses/earnings-expenses.module#EarningsExpensesModule';

const PATH_MODULE = './dashboard/dashboard.module#DashboardModule';
// const PATH_MODULE = './dashboard/dashboard.module#DashboardModule';


const ROUTERS: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        loadChildren: PATH_MODULE,
        canLoad: [ AuthGuard ]
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
