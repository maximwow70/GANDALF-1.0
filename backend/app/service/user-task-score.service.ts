import { Injectable } from "../ioc";
import { UserTask } from "app/model/user-task";
import { TaskEntity } from "app/model/task-entity";

@Injectable()
export class UserTaskScoreService {
  public getScore(userTask: UserTask, task: TaskEntity): number {
    try {
      const functionAsString: string = `return ${userTask.solution};`;
      const getFunction: Function = new Function(functionAsString);

      const tests: { input: any; output: any }[] = JSON.parse(task.tests);

      const correctAnswers: boolean[] = tests
        .map((test) => getFunction()(test.input) === test.output)
        .filter((test) => Boolean(test));
      const userScore: number =
        (correctAnswers.length / tests.length) * task.maxScore;

      return userScore;

    } catch (error) {
      console.error(error);
      return -task.maxScore;
    }
  }
}
