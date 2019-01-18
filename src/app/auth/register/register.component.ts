import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: []
})
export class RegisterComponent implements OnInit {

	constructor(public authService: AuthService) { }

	ngOnInit() {
	}

	onSubmit(form: any) {
		this.authService
		.createUser(form.name, form.email, form.password);
	}

}
