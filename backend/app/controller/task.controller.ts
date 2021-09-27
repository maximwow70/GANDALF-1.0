import { TaskEntity } from './../model/task-entity';
import { Body, Controller, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Inject } from '../ioc';
import { TaskService } from '../service/task.service';

@Route('api/tasks')
export class TaskController extends Controller {
	@Inject() private taskService!: TaskService;

	@Get('{taskId}')
	public async getTaskById(@Path() taskId: string): Promise<TaskEntity> {
		return this.taskService.getTaskById(taskId);
	}

	@Post('')
	public async createTask(@Body() dto: TaskEntity): Promise<TaskEntity> {
		return this.taskService.createTask(dto);
	}

	@Put('')
	public async updateTask(@Body() task: TaskEntity): Promise<TaskEntity> {
		return this.taskService.updateTask(task);
	}

    @Delete('{taskId}')
	public async deleteTask(@Path() taskId: string): Promise<string> {
		return this.taskService.deleteTask(taskId);
	}
}