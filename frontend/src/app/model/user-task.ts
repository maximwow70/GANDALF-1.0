import { Task } from './task';

export interface UserTask extends Task {
	taskUid: string;
	solution: string;
	userScore: number;
	userName: string;
	completed: boolean;
	reviewerComment: string;
}
