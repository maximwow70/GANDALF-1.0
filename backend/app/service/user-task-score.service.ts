import { Injectable } from "../ioc";
import { UserTask } from "app/model/user-task";
import { TaskEntity } from "app/model/task-entity";

@Injectable()
export class UserTaskScoreService {
  public getScore(userTask: UserTask, task: TaskEntity): number {
    console.log({ userTask, task });
    return Math.round(Math.random() * 100);
  }
}
