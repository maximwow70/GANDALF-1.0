import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { TasksPageRoutingModule } from './tasks-page-routing.module';
import { TasksPageComponent } from './tasks-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskTileComponent } from './components/task-tile/task-tile.component';

@NgModule({
	declarations: [TasksPageComponent, TaskTileComponent],
	imports: [TasksPageRoutingModule, MonacoEditorModule.forRoot(), MatGridListModule, FormsModule, CommonComponentsModule, CommonModule, MatButtonModule, MatIconModule],
	exports: [TasksPageComponent],
})
export class TasksPageModule {}
