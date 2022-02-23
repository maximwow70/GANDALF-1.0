import { UserTask } from '../../../model/user-task';
import { Injectable } from '@angular/core';
import { StoreEntity } from 'src/app/common-components/model/store-entity';
import { TasksRepositoryService } from './tasks-repository.service';
import { EntityStatus } from 'src/app/common-components/model/entity-status';
import { Task } from '../../../model/task';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/container/auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class TasksFacadeService {
	public userTasks: StoreEntity<UserTask[]>;
	public addTaskInProgress$: BehaviorSubject<boolean>;
	public deleteTaskInProgress$: BehaviorSubject<boolean>;

	constructor(private tasksRepository: TasksRepositoryService, private authService: AuthService) {
		this.userTasks = new StoreEntity<UserTask[]>([]);
		this.addTaskInProgress$ = new BehaviorSubject<boolean>(false);
		this.deleteTaskInProgress$ = new BehaviorSubject<boolean>(false);
	}

	public loadUserTasks(): void {
		this.userTasks.setStatus(EntityStatus.Pending);

		this.tasksRepository.loadUserTasks(this.authService.user?.email || '').subscribe(
			(tasks: UserTask[]) => {
				this.userTasks.setEntity({
					value: tasks,
					status: EntityStatus.Success,
					errors: '',
				});
			},
			() => {
				this.userTasks.setStatus(EntityStatus.Error);
			}
		);
	}

	public deleteTask(uid: string): void {
		this.deleteTaskInProgress$.next(true);
		this.userTasks.setStatus(EntityStatus.Pending);
		this.tasksRepository.deleteTask(uid).subscribe(
			() => {
				this.userTasks.setEntity({
					value: this.userTasks.value.filter((task: UserTask) => {
						return task.taskUid !== uid;
					}),
					status: EntityStatus.Success,
					errors: '',
				});
				this.deleteTaskInProgress$.next(false);
			},
			() => {
				this.userTasks.setStatus(EntityStatus.Error);
				this.deleteTaskInProgress$.next(false);
			}
		);
	}

	public addTask(task: Task): void {
		this.addTaskInProgress$.next(true);
		this.userTasks.setStatus(EntityStatus.Pending);
		this.tasksRepository.addTask(task, this.authService.user?.email || '').subscribe(
			(userTask: UserTask) => {
				this.userTasks.setEntity({
					value: [...this.userTasks.value, userTask],
					status: EntityStatus.Success,
					errors: null,
				});
				this.addTaskInProgress$.next(false);
			},
			() => {
				this.userTasks.setStatus(EntityStatus.Error);
				this.addTaskInProgress$.next(false);
			}
		);
	}
}
