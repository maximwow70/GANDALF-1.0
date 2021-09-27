import { TaskEntity } from "app/model/task-entity";
import { Inject, Injectable } from "../ioc";
import { TaskRepositoryService } from "./task-repository.service";

@Injectable()
export class TaskService {
    @Inject() taskRepository!: TaskRepositoryService;

    public getTaskById(uid: string): Promise<TaskEntity> {
        return this.taskRepository.getTaskById(uid).then((task: TaskEntity) => {
            delete (task as any)._id;
            return task;
        });
    }

    public createTask(task: TaskEntity): Promise<TaskEntity> {
        return this.taskRepository.createTask(task).then((task: TaskEntity) => {
            delete (task as any)._id;
            return task;
        });;
    }

    public updateTask(task: TaskEntity): Promise<TaskEntity> {
        return this.taskRepository.updateTask(task).then((task: TaskEntity) => {
            delete (task as any)._id;
            return task;
        });;
    }

    public deleteTask(uid: string): Promise<string> {
        return this.taskRepository.removeTask(uid);
    }
}
