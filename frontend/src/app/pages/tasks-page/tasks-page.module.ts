import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [TasksPageComponent, TaskCardComponent],
	imports: [TasksPageRoutingModule, CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule],
	exports: [TasksPageComponent],
})
export class TasksPageModule {}
