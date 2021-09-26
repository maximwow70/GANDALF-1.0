import { TestBed } from '@angular/core/testing';

import { EditTaskRepositoryService } from './edit-task-repository.service';

describe('EditTaskRepositoryService', () => {
	let service: EditTaskRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EditTaskRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
