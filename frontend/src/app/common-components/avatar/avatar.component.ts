import { Component, Input, OnInit } from '@angular/core';

export interface Avatar {
	url: string;
	name: string;
}

@Component({
	selector: 'app-avatar',
	templateUrl: './avatar.component.html',
	styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
	@Input() public avatar?: Avatar;

	constructor() {}

	ngOnInit(): void {}
}
