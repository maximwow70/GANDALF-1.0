import { TasksFacadeService } from './service/tasks-facade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTask } from '../../model/user-task';
import { map, takeUntil } from 'rxjs/operators';
import { EntityStatus } from 'src/app/common-components/model/entity-status';
import { v4 } from 'uuid';
import { TaskType } from '../../model/task-type';
import { Task } from '../../model/task';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-tasks-page',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit, OnDestroy {
	public tasks: UserTask[];
	public isTasksLoading$!: Observable<boolean>;
	public destroy$: Subject<void>;

	constructor(public tasksFacade: TasksFacadeService, private router: Router) {
		this.tasks = [];
		this.destroy$ = new Subject<void>();
	}

	public ngOnInit(): void {
		this.tasksFacade.loadUserTasks();
		this.tasks = this.tasksFacade.userTasks.value;
		this.isTasksLoading$ = this.tasksFacade.userTasks.status$.pipe(
			takeUntil(this.destroy$),
			map((status: EntityStatus) => {
				return status === EntityStatus.Pending;
			})
		);
		this.tasksFacade.userTasks.value$.pipe(takeUntil(this.destroy$)).subscribe((tasks: UserTask[]) => {
			this.tasks = tasks;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public navigateToTask(uid: string): void {
		this.router.navigateByUrl(`/task/${uid}`);
	}

	public navigateToTaskEdit(uid: string): void {
		this.router.navigateByUrl(`/edit-task/${uid}`);
	}

	public deleteTask(uid: string): void {
		const isConfirmed: boolean = confirm('Are you sure you want to delete this task? This action can not be reverted!');
		if (isConfirmed) {
			this.tasksFacade.deleteTask(uid);
		}
	}

	public addTask(): void {
		const defaultTask: Task = {
			uid: v4(),
			title: 'New Task',
			description: 'You shall not pass!1!',
			placeholder: '',
			maxScore: 100,
			type: TaskType.HTML,
			tests: '',
		};
		this.tasksFacade.addTask(defaultTask);
	}
}
