import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserTask } from 'src/app/model/user-task';

@Injectable({
	providedIn: 'root',
})
export class TaskRepositoryService {
	constructor(private http: HttpClient) {}

	public loadUserTask(uid: string): Observable<UserTask> {
		return this.http.get<UserTask>('/api/user-tasks/' + uid);
	}

	public submitTask(task: UserTask): Observable<UserTask> {
		return of({
			...task,
			userScore: 100,
			completed: true,
		}).pipe(delay(10000));
	}
}
