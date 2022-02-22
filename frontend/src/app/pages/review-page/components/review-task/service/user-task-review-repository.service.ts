import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UserTask } from 'src/app/model/user-task';
import { UserTaskReview } from 'src/app/model/user-task-review';

@Injectable({
	providedIn: 'root',
})
export class UserTaskReviewRepositoryService {
	constructor(private http: HttpClient) {}

	public submitUserTaskReview(
		userTask: UserTask | null,
		userTaskReview: UserTaskReview
	): Observable<any> {
		return this.http.put(`/api/user-tasks/` + userTask?.uid, {
			...userTask,
			review: { ...userTaskReview },
		});
	}
}
