import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserTaskReviewRepositoryService } from './user-task-review-repository.service';
import { StoreEntity } from 'src/app/common-components/model/store-entity';
import { UserTask } from 'src/app/model/user-task';
import { EntityStatus } from 'src/app/common-components/model/entity-status';
import { UserTaskReview } from 'src/app/model/user-task-review';

@Injectable({
	providedIn: 'root',
})
export class UserTaskReviewFacadeService {
	public userTask: StoreEntity<UserTask>;
	public taskLoadingInProgress$: Observable<boolean>;

	constructor(private userTaskReviewRepository: UserTaskReviewRepositoryService) {
		this.userTask = new StoreEntity<UserTask>(null);
		this.taskLoadingInProgress$ = this.userTask.status$.pipe(
			map((status: EntityStatus) => {
				return status === EntityStatus.Pending;
			})
		);
	}

	public submitTask(
		userTask: UserTask | null,
		userTaskReview: UserTaskReview
	): void {
		this.userTask.setStatus(EntityStatus.Pending);
		this.userTaskReviewRepository.submitUserTaskReview(
			userTask,
			userTaskReview
		).subscribe(
			(userTaskResult: UserTask) => {
				this.userTask.setEntity({
					value: userTaskResult,
					status: EntityStatus.Success,
					errors: '',
				});
			},
			() => {
				this.userTask.setStatus(EntityStatus.Error);
			}
		);
	}
}
