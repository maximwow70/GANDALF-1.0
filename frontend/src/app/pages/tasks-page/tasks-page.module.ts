import { NgModule } from '@angular/core';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page.component';

@NgModule({
	declarations: [TasksPageComponent],
	imports: [TasksPageRoutingModule],
	exports: [TasksPageComponent],
})
export class TasksPageModule {}
