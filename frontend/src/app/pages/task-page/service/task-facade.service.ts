import { TaskRepositoryService } from './task-repository.service';
import { Injectable } from '@angular/core';
import { StoreEntity } from 'src/app/common-components/model/store-entity';
import { UserTask } from 'src/app/model/user-task';
import { EntityStatus } from 'src/app/common-components/model/entity-status';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TaskFacadeService {
	public task: StoreEntity<UserTask>;
	public taskLoadingInProgress$: Observable<boolean>;

	constructor(private taskRepository: TaskRepositoryService) {
		this.task = new StoreEntity<UserTask>(null);
		this.taskLoadingInProgress$ = this.task.status$.pipe(
			map((status: EntityStatus) => {
				return status === EntityStatus.Pending;
			})
		);
	}

	public loadUserTask(uid: string): void {
		this.task.setStatus(EntityStatus.Pending);

		this.taskRepository.loadUserTask(uid).subscribe(
			(task: UserTask) => {
				this.task.setEntity({
					value: task,
					status: EntityStatus.Success,
					errors: '',
				});
			},
			() => {
				this.task.setStatus(EntityStatus.Error);
			}
		);
	}

	public submitTask(task: UserTask): void {
		this.task.setStatus(EntityStatus.Pending);
		this.taskRepository.submitTask(task).subscribe(
			(taskResult: UserTask) => {
				this.task.setEntity({
					value: taskResult,
					status: EntityStatus.Success,
					errors: '',
				});
			},
			() => {
				this.task.setStatus(EntityStatus.Error);
			}
		);
	}
}
