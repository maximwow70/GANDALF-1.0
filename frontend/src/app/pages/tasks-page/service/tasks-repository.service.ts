import { TaskType } from './../model/task-type';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserTask } from '../model/user-task';

@Injectable({
	providedIn: 'root',
})
export class TasksRepositoryService {
	constructor() {}

	public loadUserTasks(): Observable<UserTask[]> {
		return of([
			{
				title: 'The first task',
				solution: 'another test',
				task: '<h1>Make script which inputs 123</h1><br/>and outputs 122333',
				userScore: 0,
				maxScore: 100,
				completed: true,
				type: TaskType.JAVASCIPT,
			},
			{
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
}
