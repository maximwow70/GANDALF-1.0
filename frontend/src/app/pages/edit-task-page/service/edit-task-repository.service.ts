import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from 'src/app/model/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class EditTaskRepositoryService {
	constructor(private http: HttpClient) {}

	public loadUserTask(uid: string): Observable<Task> {
		return this.http.get<Task>('api/tasks/' + uid);
	}

	public saveTask(task: Task): Observable<Task> {
		return this.http.put<Task>('api/tasks', task);
	}
}
