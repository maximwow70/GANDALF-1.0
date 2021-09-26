import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { TaskPageRoutingModule } from './task-page-routing.module';
import { TaskPageComponent } from './task-page.component';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [TaskPageComponent],
	imports: [
		TaskPageRoutingModule,
		CommonModule,
		TaskPageRoutingModule,
		MonacoEditorModule.forRoot(),
		MatGridListModule,
		FormsModule,
		MatButtonModule,
	],
	exports: [TaskPageComponent],
})
export class TaskPageModule {}
