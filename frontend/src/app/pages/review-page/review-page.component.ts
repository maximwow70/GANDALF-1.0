import { Component, OnInit } from '@angular/core';
import { TaskFacadeService } from '../task-page/service/task-facade.service';
import { UserTask } from 'src/app/model/user-task';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-review-page',
	templateUrl: './review-page.component.html',
	styleUrls: [
		'./review-page.component.scss',
		'./review-page-media.component.scss'
	]
})
export class ReviewPageComponent implements OnInit {

	public destroy$: Subject<void>;
	public usersTasks: UserTask[];

	public currentReviewTask: UserTask | null = null;
	public isNeedToOpenReviewTask: boolean = false;

	constructor(public taskFacade: TaskFacadeService) {
		this.destroy$ = new Subject<void>();
		this.usersTasks = [];
	}

	public ngOnInit(): void {
		this.taskFacade.usersTasks.value$.subscribe((usersTasks: UserTask[]) => {
			this.usersTasks = usersTasks;
		});

		this.taskFacade.loadUsersTasks();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onReviewTask(task: UserTask): void {
		this.currentReviewTask = {...task};
		console.log(this.currentReviewTask)
		this.isNeedToOpenReviewTask = true;
	}

	public onCancelReviewTask(): void {
		this.currentReviewTask = null;
		this.isNeedToOpenReviewTask = false;
	}

}
