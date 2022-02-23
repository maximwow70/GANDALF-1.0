import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
	public isUserLogged: boolean = false;

	constructor(public authService: AuthService) {}

	ngOnInit(): void {}

	public auth(): void {
		if (!this.authService.user) {
			this.authService.signInByGithub().subscribe((a) => {
				console.log(`User logged: ${this.authService.user?.email}`);
				this.isUserLogged = true;
			});
		}
	}
}
