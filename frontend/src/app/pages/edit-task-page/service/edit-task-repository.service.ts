import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TaskType } from 'src/app/model/task-type';
import { Task } from 'src/app/model/task';

@Injectable({
	providedIn: 'root',
})
export class EditTaskRepositoryService {
	constructor() {}

	public loadUserTask(uid: string): Observable<Task> {
		return of({
			uid: '1',
			title: 'The first task',
			solutionPlaceholder: 'another test',
			task: '<h1>Make script which inputs 123</h1><br/>and outputs 122333',
			maxScore: 100,
			tests: '',
			type: TaskType.JAVASCIPT,
		}).pipe(delay(500));
	}
}
