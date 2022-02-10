import { UserTaskDto, UserTask } from "../model/user-task";
import { Injectable } from "../ioc";
import { TaskEntity } from "app/model/task-entity";

@Injectable()
export class UserTaskConverterService {
    public toDto(userTask: UserTask, task: TaskEntity): UserTaskDto {
        return {
            uid: userTask.uid,
            taskUid: task.uid,
            userId: userTask.userId,
            title: task.title,
            task: task.task,
            solution: userTask.solution ? userTask.solution : task.solutionPlaceholder,
            type: task.type,
            completed: userTask.completed,
            maxScore: task.maxScore,
            userScore: userTask.userScore
        };
    }

    public fromDto(dto: UserTaskDto): UserTask {
        return {
            uid: dto.uid,
            userId: dto.userId,
            completed: dto.completed,
            solution: dto.solution,
            userScore: dto.userScore,
            taskUid: dto.taskUid
        };
    }
}