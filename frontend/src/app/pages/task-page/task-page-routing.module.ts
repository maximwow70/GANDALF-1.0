import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from './task-page.component';

const routes: Routes = [
	{
		path: ':id',
		component: TaskPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class TaskPageRoutingModule {}
