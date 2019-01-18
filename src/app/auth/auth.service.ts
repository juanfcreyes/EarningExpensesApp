import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User as UserFireBase } from 'firebase';
import { map } from 'rxjs/operators'
import swal from 'sweetalert2';
import { User } from '../models/user.model';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	private USER_COLLECTION: string = 'usuario';

	constructor(private angularFireAuth: AngularFireAuth,
		private router: Router,
		private angularFireDB: AngularFirestore) { }

	initAuthListener() {
		this.angularFireAuth.authState
		.subscribe((fbUser: UserFireBase) => {});
	}

	createUser(name: string, email: string, password: string) {
		this.angularFireAuth.auth
		.createUserWithEmailAndPassword(email, password)
		.then((res) => {
			this.saveUserCollection(name, email, res.user.uid);
		}).catch((err)=> {
			swal('Error al registrase', err.message, 'error');
		});
	}

	private saveUserCollection(name: string, email: string, uid: string) {
		const user: User = { name, email, uid }
		this.angularFireDB.doc(`${user.uid}/${this.USER_COLLECTION}`)
		.set(user).then(() => {
			this.router.navigate(['/']);
		});
	}

	login(email: string, password: string) {
		this.angularFireAuth.auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			this.router.navigate(['/']);
		}).catch((err)=> {
			swal('Error en el login', err.message, 'error');
		});
	}

	logout() {
		this.router.navigate(['/login']);
		this.angularFireAuth.auth.signOut();
	}

	isAuth() {
		return this.angularFireAuth.authState.pipe(
			map((fbUser) =>  {
				if (fbUser === null) {
					this.router.navigate(['/login']);
				}
				return fbUser !== null;
			})
		);
	}

}
