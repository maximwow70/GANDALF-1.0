import { TaskType } from '../../../model/task-type';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserTask } from '../../../model/user-task';
import { Task } from '../../../model/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class TasksRepositoryService {
	constructor(private http: HttpClient) {}

	public loadUserTasks(userId: string): Observable<UserTask[]> {
		return this.http.get<UserTask[]>(`api/user-tasks?userId=${userId}`);
	}

	public deleteTask(uid: string): Observable<string> {
		return this.http.delete<string>('api/user-tasks/' + uid);
	}

	public addTask(task: Task, userId: string): Observable<UserTask> {
		return this.http.post<UserTask>(`api/user-tasks?userId=${userId}`, task);
	}
}
