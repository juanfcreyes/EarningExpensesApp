import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { AuthState } from 'src/app/auth/auth.reducer';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

	userName: string;
	subscription: Subscription = new Subscription();
	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.subscription = this.store.select('auth').pipe(
			filter((auth:AuthState) => auth.user !== null)
		).subscribe( auth => this.userName = auth.user.name )
	}

	ngOnDestroy () {
		this.subscription.unsubscribe();
	}

}
