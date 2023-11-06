import {NgModule} from '@angular/core';
import {
  DetailInfoRoutingModule
} from '@app/youtube/pages/detail-info/detail-info-routing-module';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [DetailInfoComponent],
  imports: [
    DetailInfoRoutingModule,
    NgIf
  ]
})
export class DetailInfoModule {
}
