import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs/tab-group';
import { AppTitles } from 'src/app/model/app-titles';
import { IFormControl } from 'src/app/model/form-control';
import { UserTask } from 'src/app/model/user-task';
import { readOnlyMonacoEditorOptions } from 'src/app/utils/monaco-editor/options';

@Component({
	selector: 'app-review-task',
	templateUrl: './review-task.component.html',
	styleUrls: ['./review-task.component.scss']
})
export class ReviewTaskComponent implements OnInit {
	@Input()
	public task: UserTask | null = null;

	@Output()
	public cancelClicked: EventEmitter<void>;

	@ViewChild('reviewTaskTabs', { static: false })
	private reviewTaskTabs: MatTabGroup | undefined;

	public monacoEditorOptions = readOnlyMonacoEditorOptions;

	public taskMinScore: number = 0;
	public taskMaxScore: number = 0;

	public taskMinCommentLength: number = 0;
	public taskMaxCommentLength: number = 512;

	public reviewTaskForm: FormGroup = new FormGroup({});

	public taskTitleControlName: string = 'taskTitleControl';
	public taskStudentControlName: string = 'taskStudentControl';
	public taskScoreControlName: string = 'taskScoreControl';
	public taskCommentControlName: string = 'taskCommentControl';

	public reviewTaskSubmitTabLabel: string = AppTitles.SUBMIT_TITLE;
	public reviewTaskSolutionTabLabel: string = AppTitles.SOLUTION_TITLE;
	public reviewTaskTestsTabLabel: string = AppTitles.TESTS_TITLE;

	public isNeedToShowSolutionEditor: boolean = false;
	public isNeedToShowTestsEditor: boolean = false;

	constructor() {
		this.cancelClicked = new EventEmitter<void>();
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

	private updateTaskScore(task:  UserTask): void {
		this.taskMinScore = 0;
		this.taskMaxScore = task.maxScore || 0;
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
		this.isNeedToShowSolutionEditor = false;
		this.isNeedToShowTestsEditor = false;
	}

	private setReviewTaskSolutionEditorShowing(): void {
		this.resetReviewTaskEditorsShowing();
		this.isNeedToShowSolutionEditor = true;
	}

	private setReviewTaskTestsEditorShowing(): void {
		this.resetReviewTaskEditorsShowing();
		this.isNeedToShowTestsEditor = true;
	}

	public ngOnInit(): void {
		this.initReviewTaskForm();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.resetComponent();

		const task: UserTask = changes.task.currentValue;

		if (task) {
			this.updateTaskScore(task);

			this.updateFormControlValue({
				formControlName: this.taskTitleControlName,
				value: task.title,
			});

			this.updateFormControlValue({
				formControlName: this.taskStudentControlName,
				value: task.userName,
			});
		}

		this.initTaskScoreFormControlValidators();
		this.initTaskCommentFormControlValidators();
	}

	public onSubmitTaskReview(): void {
		console.log('Submitted Form Values:', {
			title: this.reviewTaskForm.value[this.taskTitleControlName],
			userName: this.reviewTaskForm.value[this.taskStudentControlName],
			userScore: this.reviewTaskForm.value[this.taskScoreControlName],
			reviewerComment: this.reviewTaskForm.value[this.taskCommentControlName],
		});

		this.cancelTaskReview();
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
