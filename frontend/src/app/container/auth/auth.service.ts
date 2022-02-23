import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { User } from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
	public user: User | null = null;

	constructor(private fireAuthService: AngularFireAuth) {}

	public signInByGithub(): Observable<User> {
		return from(this.fireAuthService.signInWithPopup(new auth.GithubAuthProvider())).pipe(
			map((userModel: any) => userModel.user),
			switchMap((user: User) => {
				this.user = user;
				return of(user);
			}),
			catchError((error: Error) => of(<User>{}))
		);
	}
}
