import { TestBed } from '@angular/core/testing';

import { EditTaskFacadeService } from './edit-task-facade.service';

describe('EditTaskFacadeService', () => {
	let service: EditTaskFacadeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EditTaskFacadeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
