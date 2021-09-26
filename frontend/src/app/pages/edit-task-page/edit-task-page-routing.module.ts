import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskPageComponent } from './edit-task-page.component';

const routes: Routes = [
	{
		path: ':id',
		component: EditTaskPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class EditTaskPageRoutingModule {}
