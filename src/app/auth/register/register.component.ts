import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})

export class RegisterComponent implements OnInit, OnDestroy {

	cargando: boolean;
	susbscription: Subscription;

	constructor(public authService: AuthService, 
		public store: Store<AppState>) { }

	ngOnInit() {
		this.susbscription = this.store.select('ui')
		.subscribe(ui => this.cargando = ui.isLoading);
	}
	
	ngOnDestroy() {
		this.susbscription.unsubscribe();
	}
	
	onSubmit(form: any) {
		this.authService
		.createUser(form.name, form.email, form.password);
	}

}
