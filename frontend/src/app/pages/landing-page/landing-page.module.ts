import { NgModule } from '@angular/core';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
	declarations: [LandingPageComponent],
	imports: [LandingPageRoutingModule],
	exports: [LandingPageComponent],
})
export class LandingPageModule {}
