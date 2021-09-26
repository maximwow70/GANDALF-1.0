import { TaskType } from '../../../model/task-type';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserTask } from '../../../model/user-task';
import { delay } from 'rxjs/operators';
import { Task } from '../../../model/task';

@Injectable({
	providedIn: 'root',
})
export class TasksRepositoryService {
	constructor() {}

	public loadUserTasks(): Observable<UserTask[]> {
		return of([
			{
				uid: '1',
				taskUid: '1',
				title: 'The first task',
				solution: 'another test',
				task: '<h1>Make script which inputs 123</h1><br/>and outputs 122333',
				userScore: 0,
				maxScore: 100,
				completed: true,
				type: TaskType.JAVASCIPT,
			},
			{
				uid: '2',
				taskUid: '2',
				title: 'The second magic task about atatat',
				solution: '<some-tag></some-tag>',
				task: 'yur first html tag',
				userScore: 15,
				maxScore: 100,
				completed: false,
				type: TaskType.HTML,
			},
		]);
	}

	public deleteTask(uid: string): Observable<boolean> {
		return of(true).pipe(delay(5000));
	}

	public addTask(task: Task): Observable<UserTask> {
		return of({
			uid: '3',
			taskUid: task.uid,
			title: task.title,
			solution: task.solutionPlaceholder,
			task: task.task,
			userScore: 0,
			maxScore: task.maxScore,
			completed: false,
			type: TaskType.HTML,
		}).pipe(delay(5000));
	}
}
