import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs/tab-group';
import { AppTitles } from 'src/app/model/app-titles';
import { IFormControl } from 'src/app/model/form-control';
import { ProcessStatus } from 'src/app/model/process-status';
import { UserTask } from 'src/app/model/user-task';
import { UserTaskReview } from 'src/app/model/user-task-review';
import { taskFormOptions } from 'src/app/utils/form/options';
import { readOnlyMonacoEditorOptions } from 'src/app/utils/monaco-editor/options';
import { UserTaskReviewFacadeService } from './service/user-task-review-facade.service';

@Component({
	selector: 'app-review-task',
	templateUrl: './review-task.component.html',
	styleUrls: ['./review-task.component.scss']
})
export class ReviewTaskComponent implements OnInit {
	@Input()
	public userTask: UserTask | null = null;

	@Output()
	public cancelClicked: EventEmitter<void>;

	@Output()
	public userTaskUpdated: EventEmitter<void>;

	@ViewChild('reviewTaskTabs', { static: false })
	private reviewTaskTabs: MatTabGroup | undefined;

	public monacoEditorOptions = readOnlyMonacoEditorOptions;

	public taskMinScore: number = taskFormOptions.defaultMinScore;
	public taskMaxScore: number = taskFormOptions.defaultMaxScore;

	public taskMinCommentLength: number = taskFormOptions.minCommentLength;
	public taskMaxCommentLength: number = taskFormOptions.maxCommentLength;

	public reviewTaskForm: FormGroup = new FormGroup({});

	public taskTitleControlName: string = 'taskTitleControl';
	public taskStudentControlName: string = 'taskStudentControl';
	public taskScoreControlName: string = 'taskScoreControl';
	public taskCommentControlName: string = 'taskCommentControl';

	public reviewTaskSubmitTabLabel: string = AppTitles.SUBMIT_TITLE;
	public reviewTaskSolutionTabLabel: string = AppTitles.SOLUTION_TITLE;
	public reviewTaskTestsTabLabel: string = AppTitles.TESTS_TITLE;

	public showSolutionEditor: boolean = false;
	public showTestsEditor: boolean = false;

	constructor(public userTaskReviewFacade: UserTaskReviewFacadeService) {
		this.cancelClicked = new EventEmitter<void>();
		this.userTaskUpdated = new EventEmitter<void>();
	}

	private initReviewTaskForm(): void {
		this.reviewTaskForm = new FormGroup({
			[this.taskTitleControlName]: new FormControl('', []),
			[this.taskStudentControlName]: new FormControl('', []),
			[this.taskScoreControlName]: new FormControl('', []),
			[this.taskCommentControlName]: new FormControl('', []),
		});
	}

	private initTaskScoreFormControlValidators(): void {
		this.reviewTaskForm.get(this.taskScoreControlName)?.addValidators([
			Validators.required,
			Validators.min(this.taskMinScore),
			Validators.max(this.taskMaxScore),
		]);
	}

	private initTaskCommentFormControlValidators(): void {
		this.reviewTaskForm.get(this.taskCommentControlName)?.addValidators([
			Validators.required,
			Validators.min(this.taskMinCommentLength),
			Validators.max(this.taskMaxCommentLength),
		]);
	}

	private updateTaskScoreRange(userTask:  UserTask): void {
		this.taskMinScore = 0;
		this.taskMaxScore = userTask.maxScore || 0;
	}

	private updateFormControlValue({
		formControlName,
		value,
	}: IFormControl): void {
		this.reviewTaskForm.get(formControlName)?.setValue(value || AppTitles.EMPTY_STATE_INPUT_VALUE);
	}

	private cancelTaskReview(): void {
		this.resetComponent();

		this.reviewTaskForm.reset();
		this.cancelClicked.next();
	}

	private resetComponent(): void {
		this.setReviewTaskSelectedTab(0);
		this.resetReviewTaskEditorsShowing();
	}

	private setReviewTaskSelectedTab(index: number): void {
		if (this.reviewTaskTabs) {
			this.reviewTaskTabs.selectedIndex = index;
		}
	}

	private resetReviewTaskEditorsShowing(): void {
		this.showSolutionEditor = false;
		this.showTestsEditor = false;
	}

	private setReviewTaskSolutionEditorShowing(): void {
		this.resetReviewTaskEditorsShowing();
		this.showSolutionEditor = true;
	}

	private setReviewTaskTestsEditorShowing(): void {
		this.resetReviewTaskEditorsShowing();
		this.showTestsEditor = true;
	}

	private updateTaskReview(processStatus: ProcessStatus): void {
		const userTaskReview: UserTaskReview = {
			reviewerName: '',
			score: this.reviewTaskForm.value[this.taskScoreControlName],
			comment: this.reviewTaskForm.value[this.taskCommentControlName],
			status: processStatus,
		};

		this.userTaskReviewFacade.submitTask(this.userTask, userTaskReview);

		this.userTaskUpdated.next();

		this.cancelTaskReview();
	}

	public ngOnInit(): void {
		this.initReviewTaskForm();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.resetComponent();

		const userTask: UserTask = changes.userTask.currentValue;

		if (userTask) {
			this.updateTaskScoreRange(userTask);

			this.updateFormControlValue({
				formControlName: this.taskTitleControlName,
				value: userTask.title,
			});

			// When user authentification will be done we can bind [value] here
			this.updateFormControlValue({
				formControlName: this.taskStudentControlName,
				value: '',
			});

			this.updateFormControlValue({
				formControlName: this.taskScoreControlName,
				value: String(userTask.review.score),
			});

			this.updateFormControlValue({
				formControlName: this.taskCommentControlName,
				value: userTask.review.comment,
			});
		}

		this.initTaskScoreFormControlValidators();
		this.initTaskCommentFormControlValidators();
	}

	public onSubmitTaskReview(): void {
		this.updateTaskReview(ProcessStatus.COMPLETED);
	}

	public onDraftTaskReview(): void {
		this.updateTaskReview(ProcessStatus.DRAFT);
	}

	public onCancelTaskReview(): void {
		this.cancelTaskReview();
	}

	public onSelectedReviewTaskTabChange(event: MatTabChangeEvent): void {
		switch (event.tab.textLabel) {
			case this.reviewTaskSubmitTabLabel:
				this.resetReviewTaskEditorsShowing();
				break;
			case this.reviewTaskSolutionTabLabel:
				this.setReviewTaskSolutionEditorShowing();
				break;
			case this.reviewTaskTestsTabLabel:
				this.setReviewTaskTestsEditorShowing();
				break;
		}
	}
}
