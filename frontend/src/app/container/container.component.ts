import { Component, OnInit } from '@angular/core';
import { Avatar } from '../common-components/avatar/avatar.component';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
	public avatar: Avatar = {
		url: '',
		name: 'Billy',
	};

	constructor() {}

	ngOnInit(): void {}
}
