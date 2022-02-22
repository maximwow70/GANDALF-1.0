import { ProcessStatus } from './process-status';
import { Task } from './task';
import { UserTaskReview } from './user-task-review';

export interface UserTask extends Task {
	taskUid: string;
	solution: string;
	userScore: number;
	status: ProcessStatus;
	review: UserTaskReview;
}
