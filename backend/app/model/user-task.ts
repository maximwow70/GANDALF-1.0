import { TaskType } from './task-type';

export interface UserTaskDto {
	uid: string;
	taskUid: string;
	title: string;
	solution: string;
	task: string;
	userScore: number;
	maxScore: number;
	completed: boolean;
	type: TaskType;
}

export interface UserTask {
	uid: string;
	taskUid: string;
	solution: string;
	userScore: number;
	completed: boolean;
}

