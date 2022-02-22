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
            description: task.description,
            solution: userTask.solution ? userTask.solution : task.placeholder,
            type: task.type,
            status: userTask.status,
            maxScore: task.maxScore,
            userScore: userTask.userScore,
            review: userTask.review,
        };
    }

    public fromDto(dto: UserTaskDto): UserTask {
        return {
            uid: dto.uid,
            userId: dto.userId,
            status: dto.status,
            solution: dto.solution,
            userScore: dto.userScore,
            taskUid: dto.taskUid,
            review: dto.review,
        };
    }
}