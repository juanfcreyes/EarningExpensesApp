import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

	constructor(private router: Router, 
		private authService: AuthService) {}

	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isAuth();
	}

	canLoad() : Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isAuth().pipe(take(1));
	}
}
