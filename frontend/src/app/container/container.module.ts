import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { ContainerComponent } from './container.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
	declarations: [ContainerComponent],
	imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, CommonComponentsModule, AuthModule],
	exports: [ContainerComponent],
})
export class ContainerModule {}
