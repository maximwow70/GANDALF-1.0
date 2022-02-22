import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { TaskPageRoutingModule } from './task-page-routing.module';
import { TaskPageComponent } from './task-page.component';

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
		MatIconModule,
	],
	exports: [TaskPageComponent],
})
export class TaskPageModule {}
