import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () =>
					import('./pages/landing-page/landing-page.module').then(
						(m: typeof import('./pages/landing-page/landing-page.module')) => m.LandingPageModule
					),
			},
			{
				path: 'tasks',
				pathMatch: 'full',
				loadChildren: () =>
					import('./pages/tasks-page/tasks-page.module').then(
						(m: typeof import('./pages/tasks-page/tasks-page.module')) => m.TasksPageModule
					),
			},
			{
				path: 'task',
				loadChildren: () =>
					import('./pages/task-page/task-page.module').then(
						(m: typeof import('./pages/task-page/task-page.module')) => m.TaskPageModule
					),
			},
			{
				path: 'edit-task',
				loadChildren: () =>
					import('./pages/edit-task-page/edit-task-page.module').then(
						(m: typeof import('./pages/edit-task-page/edit-task-page.module')) => m.EditTaskPageModule
					),
			},
			{
				path: 'review',
				loadChildren: () =>
					import('./pages/review-page/review-page.module').then(
						(m: typeof import('./pages/review-page/review-page.module')) => m.ReviewPageModule
					),
			},
			{
				path: '**',
				redirectTo: '',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
