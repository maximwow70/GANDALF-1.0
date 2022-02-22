import { TaskType } from './task-type';

export interface Task {
	uid: string;
	title: string;
	description: string;
	tests: string;
	type: TaskType;
	maxScore: number;
	placeholder: string;
}
