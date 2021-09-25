import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('./pages/landing-page/landing-page.module').then((m: typeof import('./pages/landing-page/landing-page.module')) => m.LandingPageModule),
			},
			{
				path: 'tasks',
				pathMatch: 'full',
				loadChildren: () => import('./pages/tasks-page/tasks-page.module').then((m: typeof import('./pages/tasks-page/tasks-page.module')) => m.TasksPageModule),
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
