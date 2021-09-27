import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { EditTaskPageRoutingModule } from './edit-task-page-routing.module';
import { EditTaskPageComponent } from './edit-task-page.component';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [EditTaskPageComponent],
	imports: [
		EditTaskPageRoutingModule,
		CommonModule,
		EditTaskPageRoutingModule,
		MonacoEditorModule.forRoot(),
		MatGridListModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatTabsModule,
		MatInputModule,
		MatSelectModule,
		CKEditorModule,
		MatIconModule,
		HttpClientModule,
	],
	exports: [EditTaskPageComponent],
})
export class EditTaskPageModule {}
