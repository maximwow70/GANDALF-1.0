import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
	@Input() public user: User | null = null;

	constructor() {}

	ngOnInit(): void {}
}
