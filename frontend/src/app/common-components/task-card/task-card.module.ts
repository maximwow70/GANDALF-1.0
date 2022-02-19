import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { TaskCardComponent } from './task-card.component';

@NgModule({
	declarations: [TaskCardComponent],
	imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
    ],
	exports: [TaskCardComponent],
})
export class TaskCardModule {}
