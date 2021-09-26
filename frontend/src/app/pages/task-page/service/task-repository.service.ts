import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TaskType } from 'src/app/model/task-type';
import { UserTask } from 'src/app/model/user-task';

@Injectable({
	providedIn: 'root',
})
export class TaskRepositoryService {
	constructor() {}

	public loadUserTask(uid: string): Observable<UserTask> {
		return of({
			uid: '1',
			taskUid: '1',
			title: 'The first task',
			solution: 'another test',
			task: '<h1>Make script which inputs 123</h1><br/>and outputs 122333',
			userScore: 0,
			maxScore: 100,
			completed: true,
			type: TaskType.JAVASCIPT,
		}).pipe(delay(500));
	}

	public submitTask(task: UserTask): Observable<UserTask> {
		return of({
			...task,
			userScore: 100,
			completed: true,
		}).pipe(delay(10000));
	}
}
