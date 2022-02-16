import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserTask } from 'src/app/model/user-task';

@Component({
	selector: 'app-review-task',
	templateUrl: './review-task.component.html',
	styleUrls: ['./review-task.component.scss']
})
export class ReviewTaskComponent implements OnInit {
	@Input() task: UserTask | null = null;

	@Output() cancelClicked: EventEmitter<void>;

	constructor() {
		this.cancelClicked = new EventEmitter<void>();
	}

	public ngOnInit(): void {}
}
