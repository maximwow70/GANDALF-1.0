import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityStatus } from 'src/app/common-components/model/entity-status';
import { StoreEntity } from 'src/app/common-components/model/store-entity';
import { EditTaskRepositoryService } from './edit-task-repository.service';
import { Task } from '../../../model/task';

@Injectable({
	providedIn: 'root',
})
export class EditTaskFacadeService {
	public task: StoreEntity<Task>;
	public taskLoadingInProgress$: Observable<boolean>;

	constructor(private taskRepository: EditTaskRepositoryService) {
		this.task = new StoreEntity<Task>(null);
		this.taskLoadingInProgress$ = this.task.status$.pipe(
			map((status: EntityStatus) => {
				return status === EntityStatus.Pending;
			})
		);
	}

	public loadUserTask(uid: string): void {
		this.task.setStatus(EntityStatus.Pending);

		this.taskRepository.loadUserTask(uid).subscribe(
			(task: Task) => {
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
}
