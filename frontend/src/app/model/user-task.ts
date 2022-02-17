import { TaskType } from './task-type';

export interface UserTask {
	uid: string;
	taskUid: string;
	title: string;
	solution: string;
	task: string;
	userScore: number;
	userName: string;
	maxScore: number;
	completed: boolean;
	type: TaskType;
	reviewerComment: string;
}
