import { TaskType } from './task-type';

export interface Task {
	uid: string;
	title: string;
	task: string;
	tests: string;
	type: TaskType;
	maxScore: number;
	solutionPlaceholder: string;
}
