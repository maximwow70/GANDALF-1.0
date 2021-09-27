import { UserTaskConverterService } from './user-task-converter.service';
import { v4 } from 'uuid';
import { TaskEntity } from "../model/task-entity";
import { UserTask, UserTaskDto } from "../model/user-task";
import { Inject, Injectable } from "../ioc";
import { TaskService } from "./task.service";
import { UserTaskRepositoryService } from "./user-task-repository.service";
import { TaskRepositoryService } from './task-repository.service';

const userId: string = 'admin';

@Injectable()
export class UserTaskService {
    @Inject() taskService!: TaskService;
    @Inject() userTaskRepository!: UserTaskRepositoryService;
    @Inject() taskRepository!: TaskRepositoryService;
    @Inject() userTaskConverter!: UserTaskConverterService;

    public async getUserTaskById(uid: string): Promise<UserTaskDto> {
        const userTask: UserTask = await this.userTaskRepository.getTaskById(uid);
        const task: TaskEntity = await this.taskRepository.getTaskById(userTask.taskUid);

        return Promise.resolve(this.userTaskConverter.toDto(userTask, task));
    }

    public async getAllTasks(): Promise<UserTaskDto[]> {
        const tasks: TaskEntity[] = await this.taskRepository.getAllTasks();

        const existingUserTasks: UserTask[] = await this.userTaskRepository.getAllTasksByUserId(userId);

        const tasksToAdd: TaskEntity[] = tasks.filter((task: TaskEntity) => {
            return !existingUserTasks.find((existingTask: UserTask) => existingTask.taskUid === task.uid);
        });

        const userTasksToAdd = tasksToAdd.map((taskToAdd: TaskEntity) => {
            const userTask: UserTask = this.generateUserTaskByTask(taskToAdd);
            return userTask;
        });

        if (userTasksToAdd.length) {
            await this.userTaskRepository.addTasksBulk(userTasksToAdd);
        }

        const fullTasksList: UserTask[] = [...existingUserTasks, ...userTasksToAdd];

        const sortedTasksList: UserTaskDto[] = tasks.map((task: TaskEntity) => {
            const userTask: UserTask = fullTasksList.find((userTask: UserTask) => userTask.taskUid === task.uid) as UserTask;
            return this.userTaskConverter.toDto(userTask, task);
        });

        return Promise.resolve(sortedTasksList);
    }

    public async createUserTask(task: TaskEntity): Promise<UserTaskDto> {
        const createdTask: TaskEntity = await this.taskService.createTask(task);

        const userTask: UserTask = this.generateUserTaskByTask(createdTask);

        await this.userTaskRepository.createTask(userTask);

        return this.getUserTaskById(userTask.uid);
    }

    public async updateUserTask(dto: UserTaskDto): Promise<UserTaskDto> {
        const userTask: UserTask = this.userTaskConverter.fromDto(dto);
        await this.userTaskRepository.updateTask(userTask);
        return Promise.resolve(dto);
    }

    public async removeUserTasksByTaskId(uid: string): Promise<string> {
        return this.userTaskRepository.removeTaskByTaskUid(uid);
    }

    private generateUserTaskByTask(task: TaskEntity): UserTask {
        const userTask: UserTask = {
            uid: v4(),
            taskUid: task.uid,
            solution: task.solutionPlaceholder,
            userScore: 0,
            completed: false
        };

        return userTask;
    }
}