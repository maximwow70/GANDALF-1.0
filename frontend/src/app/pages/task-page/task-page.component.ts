import { TaskFacadeService } from './service/task-facade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserTask } from 'src/app/model/user-task';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-task-page',
	templateUrl: './task-page.component.html',
	styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
	public editorOptions = { theme: 'vs-dark', language: 'typescript' };
	public task!: UserTask;
	public destroy$: Subject<void>;

	constructor(public taskFacade: TaskFacadeService, private route: ActivatedRoute) {
		this.destroy$ = new Subject<void>();
	}

	public ngOnInit(): void {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((userTaskUid: string) => {
				this.taskFacade.loadUserTask(userTaskUid);
			});

		this.taskFacade.task.value$.subscribe((task: UserTask) => {
			this.task = task;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public submitTask(task: UserTask): void {
		this.taskFacade.submitTask(task);
	}
}
