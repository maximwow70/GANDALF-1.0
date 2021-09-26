import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditTaskFacadeService } from './service/edit-task-facade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/app/model/task';
import { Subject } from 'rxjs';
import { TaskType } from 'src/app/model/task-type';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit-task-page',
	templateUrl: './edit-task-page.component.html',
	styleUrls: ['./edit-task-page.component.scss'],
})
export class EditTaskPageComponent implements OnInit, OnDestroy {
	public Editor = ClassicEditor;
	public editorOptions = { theme: 'vs-dark', language: 'typescript' };
	public task!: Task;
	public destroy$: Subject<void>;
	public titleFormControl: FormControl;
	public maxScoreFormControl: FormControl;

	constructor(public taskFacade: EditTaskFacadeService, private route: ActivatedRoute) {
		this.destroy$ = new Subject<void>();
		this.titleFormControl = new FormControl('', [Validators.required]);
		this.maxScoreFormControl = new FormControl('', [Validators.required]);
	}

	public get isJsTask(): boolean {
		return this.task?.type === TaskType.JAVASCIPT;
	}

	public ngOnInit(): void {
		this.route.paramMap
			.pipe(
				switchMap((params: ParamMap) => params.getAll('id')),
				takeUntil(this.destroy$)
			)
			.subscribe((userTaskUid: string) => {
				this.taskFacade.loadUserTask(userTaskUid);
			});

		this.taskFacade.task.value$.pipe(filter((task: Task) => Boolean(task))).subscribe((task: Task) => {
			this.task = task;
			this.titleFormControl.setValue(task.title);
			this.maxScoreFormControl.setValue(task.maxScore);
		});

		this.titleFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: string) => {
			this.task.title = value;
		});

		this.maxScoreFormControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value: number) => {
			this.task.maxScore = value;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onTabChange(): void {
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		}, 150);
	}
}
