import {NgModule} from '@angular/core';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@NgModule({
  declarations: [DetailInfoComponent],
  imports: [
    NgIf,
    RouterLink
  ]
})
export class DetailInfoModule {
}
