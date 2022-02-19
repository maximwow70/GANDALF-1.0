import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from '@angular/material/sidenav';

import { ReviewPageComponent } from './review-page.component';
import { ReviewPageRoutingModule } from './review-page-routing.module';
import { ReviewTaskModule } from './components/review-task/review-task.module';
import { TaskCardModule } from '../tasks-page/components/task-card/task-card.module';

@NgModule({
    declarations: [ReviewPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReviewPageRoutingModule,
        ReviewTaskModule,
        TaskCardModule,
        MatSidenavModule,
    ],
    exports: [ReviewPageComponent],
})
export class ReviewPageModule {}
