import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewPageComponent } from './review-page.component';
import { ReviewPageRoutingModule } from './review-page-routing.module';

@NgModule({
    declarations: [ReviewPageComponent],
    imports: [
        CommonModule,
        ReviewPageRoutingModule,
    ],
    exports: [ReviewPageComponent],
})
export class ReviewPageModule {}
