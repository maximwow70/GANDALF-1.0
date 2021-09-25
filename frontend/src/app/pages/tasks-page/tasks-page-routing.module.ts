import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './tasks-page.component';

const routes: Routes = [
	{
		path: '',
		component: TasksPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TasksPageRoutingModule {}
