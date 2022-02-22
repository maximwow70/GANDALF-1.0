import { ProcessStatus } from './process-status';
import { TaskType } from './task-type';
import { UserTaskReview } from './user-task-review';

export interface UserTaskDto {
	uid: string;
	taskUid: string;
	userId: string;
	title: string;
	solution: string;
	description: string;
	userScore: number;
	maxScore: number;
	status: ProcessStatus;
	type: TaskType;
	review: UserTaskReview;
}
export interface UserTask {
	uid: string;
	userId: string;
	taskUid: string;
	solution: string;
	userScore: number;
	status: ProcessStatus;
	review: UserTaskReview;
}

