import { TasksFacadeService } from './service/tasks-facade.service';
import { Component, OnInit } from '@angular/core';
import { UserTask } from './model/user-task';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-tasks-page',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit {
	public editorOptions = { theme: 'vs-dark', language: 'typescript' };
	public tasks$!: Observable<UserTask[]>;
	public completedTasksCount$!: Observable<number>;
	public tasksCount$!: Observable<number>;
	public selectedTask!: UserTask;

	constructor(private tasksFacadeService: TasksFacadeService) {}

	public ngOnInit(): void {
		this.tasksFacadeService.loadUserTasks();
		this.tasks$ = this.tasksFacadeService.userTasks.value$;
		this.completedTasksCount$ = this.tasks$.pipe(
			map((tasks: UserTask[]) => {
				return tasks.filter((task: UserTask) => task.completed).length;
			})
		);
		this.tasksCount$ = this.tasks$.pipe(
			map((tasks: UserTask[]) => {
				return tasks.length;
			})
		);
	}

	public selectTask(task: UserTask): void {
		this.selectedTask = task;
		this.editorOptions = {
			...this.editorOptions,
			language: task.type,
		};
	}
}
