import { TaskType } from './task-type';

export interface UserTask {
	title: string;
	solution: string;
	task: string;
	userScore: number;
	maxScore: number;
	completed: boolean;
	type: TaskType;
}
