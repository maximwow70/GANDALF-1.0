import { UserTask } from '../../model/user-task';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
	@Input() task: UserTask | null = null;

	@Input() isDeleteDisabled!: boolean | null;
	@Input() isReviewMode: boolean = false;
	@Input() isHighlighted: boolean = false;
	@Input() isInReview: boolean = false;

	@Output() openClicked: EventEmitter<void>;
	@Output() editClicked: EventEmitter<void>;
	@Output() reviewClicked: EventEmitter<void>;
	@Output() deleteClicked: EventEmitter<void>;

	constructor() {
		this.openClicked = new EventEmitter<void>();
		this.editClicked = new EventEmitter<void>();
		this.reviewClicked = new EventEmitter<void>();
		this.deleteClicked = new EventEmitter<void>();
	}
}
