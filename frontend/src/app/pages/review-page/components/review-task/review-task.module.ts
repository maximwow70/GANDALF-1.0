import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ReviewTaskComponent } from './review-task.component';

@NgModule({
    declarations: [ReviewTaskComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MonacoEditorModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
    ],
    exports: [ReviewTaskComponent],
})
export class ReviewTaskModule {}
