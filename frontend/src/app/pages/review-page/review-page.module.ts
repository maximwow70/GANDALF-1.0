import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewPageComponent } from './review-page.component';
import { ReviewPageRoutingModule } from './review-page-routing.module';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ReviewPageComponent],
    imports: [
        CommonModule,
        ReviewPageRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule
    ],
    exports: [ReviewPageComponent],
})
export class ReviewPageModule {}
