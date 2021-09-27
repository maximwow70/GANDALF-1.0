import { TaskEntity } from './../model/task-entity';
import { Body, Controller, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Inject } from '../ioc';
import { UserTaskService } from '../service/user-task.service';
import { TaskService } from '../service/task.service';
import { UserTaskDto } from '../model/user-task';

@Route('api/user-tasks')
export class UserTaskController extends Controller {
	@Inject() private userTaskService!: UserTaskService;
    @Inject() private taskService!: TaskService;

    @Get('')
	public async getAllTasks(): Promise<UserTaskDto[]> {
		return this.userTaskService.getAllTasks();
	}

	@Get('{taskId}')
	public async getTaskById(@Path() taskId: string): Promise<UserTaskDto> {
		return this.userTaskService.getUserTaskById(taskId);
	}

	@Post('')
	public async createTask(@Body() dto: TaskEntity): Promise<UserTaskDto> {
		return this.userTaskService.createUserTask(dto);
	}

	@Put('{radarId}')
	public async updateTask(@Body() dto: UserTaskDto): Promise<UserTaskDto> {
		return this.userTaskService.updateUserTask(dto);
	}

    @Delete('{taskId}')
	public async deleteTask(@Path() taskId: string): Promise<string> {
        await this.taskService.deleteTask(taskId);
		return this.userTaskService.removeUserTasksByTaskId(taskId);
	}
}