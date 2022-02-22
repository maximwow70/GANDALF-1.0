import { TestBed } from '@angular/core/testing';

import { UserTaskReviewFacadeService } from './user-task-review-facade.service';

describe('UserTaskReviewFacadeService', () => {
	let service: UserTaskReviewFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserTaskReviewFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
