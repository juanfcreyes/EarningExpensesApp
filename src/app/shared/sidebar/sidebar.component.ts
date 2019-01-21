import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { EarningsExpensesService } from 'src/app/earnings-expenses/earnings-expenses.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: []
})
export class SidebarComponent implements OnInit {

	userName: string;
	subscription: Subscription = new Subscription();
	constructor(private store: Store<AppState>, 
		private authService: AuthService,
		private earningExpenseService: EarningsExpensesService) { }

	ngOnInit() {
		this.subscription = this.store.select('auth').pipe(
			filter(auth => auth.user !== null)
		).subscribe( auth => this.userName = auth.user.name )
	}

	ngOnDestroy () {
		this.subscription.unsubscribe();
	}

	logout() {
		this.earningExpenseService.closeSubscriptions();
		this.authService.logout();



	}

}
