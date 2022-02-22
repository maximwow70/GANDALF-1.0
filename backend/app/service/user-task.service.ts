import { UserTaskConverterService } from "./user-task-converter.service";
import { v4 } from "uuid";
import { TaskEntity } from "../model/task-entity";
import { UserTask, UserTaskDto } from "../model/user-task";
import { Inject, Injectable } from "../ioc";
import { TaskService } from "./task.service";
import { UserTaskRepositoryService } from "./user-task-repository.service";
import { TaskRepositoryService } from "./task-repository.service";
import { UserTaskScoreService } from "./user-task-score.service";
import { ProcessStatus } from "../model/process-status";

const userId: string = "admin";

@Injectable()
export class UserTaskService {
  @Inject() taskService!: TaskService;
  @Inject() userTaskRepository!: UserTaskRepositoryService;
  @Inject() taskRepository!: TaskRepositoryService;
  @Inject() userTaskConverter!: UserTaskConverterService;
  @Inject() userTaskScoreService!: UserTaskScoreService;

  public async getUserTaskById(uid: string): Promise<UserTaskDto> {
    const userTask: UserTask = await this.userTaskRepository.getTaskById(uid);
    const task: TaskEntity = await this.taskRepository.getTaskById(
      userTask.taskUid
    );

    return Promise.resolve(this.userTaskConverter.toDto(userTask, task));
  }

  public async getAllTasks(): Promise<UserTaskDto[]> {
    const tasks: TaskEntity[] = await this.taskRepository.getAllTasks();

    const existingUserTasks: UserTask[] =
      await this.userTaskRepository.getAllTasksByUserId(userId);

    const tasksToAdd: TaskEntity[] = tasks.filter((task: TaskEntity) => {
      return !existingUserTasks.some(
        (existingTask: UserTask) => existingTask.taskUid === task.uid
      );
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
      const userTask: UserTask = fullTasksList.find(
        (userTask: UserTask) => userTask.taskUid === task.uid
      ) as UserTask;
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
    const task: TaskEntity = await this.taskRepository.getTaskById(
      userTask.taskUid
    );
    const userScore: number = this.userTaskScoreService.getScore(
      userTask,
      task
    );
    const userTaskWithScore: UserTask = {
      ...userTask,
      userScore: userScore,
    };
    await this.userTaskRepository.updateTask(userTaskWithScore);
    return Promise.resolve({ ...dto, userScore });
  }

  public async removeUserTasksByTaskId(uid: string): Promise<string> {
    return this.userTaskRepository.removeTaskByTaskUid(uid);
  }

  private generateUserTaskByTask(task: TaskEntity): UserTask {
    const userTask: UserTask = {
      uid: v4(),
      //   todo: use real userID
      userId: userId,
      taskUid: task.uid,
      solution: task.placeholder,
      userScore: 0,
      completed: false,
      review: {
        reviewerName: "",
        score: null,
        comment: "",
        status: ProcessStatus.NOT_STARTED,
      },
    };

    return userTask;
  }
}
