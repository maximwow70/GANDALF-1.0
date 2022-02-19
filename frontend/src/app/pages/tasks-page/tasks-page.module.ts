import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page.component';
import { TaskCardModule } from './components/task-card/task-card.module';

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
