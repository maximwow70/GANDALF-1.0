import { Injectable } from '@angular/core';
import { StoreEntity } from 'src/app/common-components/model/store-entity';
import { UserTask } from '../model/user-task';
import { TasksRepositoryService } from './tasks-repository.service';
import { EntityStatus } from 'src/app/common-components/model/entity-status';

@Injectable({
	providedIn: 'root',
})
export class TasksFacadeService {
	public userTasks: StoreEntity<UserTask[]>;

	constructor(private tasksRespository: TasksRepositoryService) {
		this.userTasks = new StoreEntity<UserTask[]>([]);
	}

	public loadUserTasks(): void {
		this.userTasks.setStatus(EntityStatus.Pending);

		this.tasksRespository.loadUserTasks().subscribe(
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
}
