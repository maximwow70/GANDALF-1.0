import { TestBed } from '@angular/core/testing';

import { UserTaskReviewRepositoryService } from './user-task-review-repository.service';

describe('UserTaskReviewRepositoryService', () => {
	let service: UserTaskReviewRepositoryService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserTaskReviewRepositoryService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
