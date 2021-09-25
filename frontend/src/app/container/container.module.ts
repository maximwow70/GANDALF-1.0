import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ContainerComponent],
	imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
	exports: [ContainerComponent],
})
export class ContainerModule {}
