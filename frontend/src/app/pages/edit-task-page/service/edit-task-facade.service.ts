import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
	public taskSaveInProgress$: BehaviorSubject<boolean>;

	constructor(private taskRepository: EditTaskRepositoryService) {
		this.task = new StoreEntity<Task>(null);
		this.taskSaveInProgress$ = new BehaviorSubject<boolean>(false);
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

	public saveTask(task: Task): void {
		this.taskSaveInProgress$.next(true);
		this.task.setStatus(EntityStatus.Pending);
		this.taskRepository.saveTask(task).subscribe(
			(task: Task) => {
				this.task.setEntity({
					value: task,
					status: EntityStatus.Success,
					errors: '',
				});
				this.taskSaveInProgress$.next(false);
			},
			() => {
				this.task.setStatus(EntityStatus.Error);
				this.taskSaveInProgress$.next(false);
			}
		);
	}
}
