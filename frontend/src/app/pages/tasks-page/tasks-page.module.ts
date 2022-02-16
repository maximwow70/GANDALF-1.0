import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page.component';

import { TaskCardModule } from './components/task-card/task-card.module';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [TasksPageComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		TasksPageRoutingModule,
		TaskCardModule,
		MatButtonModule,
	],
	exports: [TasksPageComponent],
})
export class TasksPageModule {}
