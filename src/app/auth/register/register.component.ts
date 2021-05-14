import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

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
		if (this.susbscription) {
			this.susbscription.unsubscribe();
		}
	}
	
	onSubmit(form: any) {
		let canSave = Boolean(form.name) && Boolean(form.email) && Boolean(form.password) && Boolean(form.passwordRepeated)
		if (!canSave) {
			swal.fire('Formulario incompleto', 'Debe llenar todos los datos del formulario', 'error');
			return;
		}
		canSave = form.password === form.passwordRepeated;
		if (canSave) {
			this.authService
			.createUser(form.name, form.email, form.password);
		} else {
			swal.fire('Passwords no coinciden', 'Los passwords deben ser iguales', 'error');
		}
		
	}

}
