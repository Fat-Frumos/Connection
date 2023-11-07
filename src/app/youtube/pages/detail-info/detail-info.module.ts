import {NgModule} from '@angular/core';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [DetailInfoComponent],
  imports: [
    NgIf
  ]
})
export class DetailInfoModule {
}
