import { TestBed } from '@angular/core/testing';

import { TasksRepositoryService } from './tasks-repository.service';

describe('TasksRepositoryService', () => {
	let service: TasksRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TasksRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
