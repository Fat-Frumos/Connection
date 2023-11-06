import {NgModule} from '@angular/core';
import {DetailInfoRoutingModule} from '@app/youtube/pages/detail-info/detail-info-routing-module';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';

@NgModule({
  declarations: [DetailInfoComponent],
  imports: [
    DetailInfoRoutingModule
  ]
})
export class DetailInfoModule {
}
