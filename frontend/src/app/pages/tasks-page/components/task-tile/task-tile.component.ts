import { UserTask } from './../../model/user-task';
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-task-tile',
	templateUrl: './task-tile.component.html',
	styleUrls: ['./task-tile.component.scss'],
})
export class TaskTileComponent {
	@Input() task!: UserTask;

	constructor() {}
}
