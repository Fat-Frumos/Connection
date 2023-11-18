import {NgModule} from '@angular/core';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {CardComponent} from '@app/youtube/components/card/card.component';
import {FilterByPipe} from '@app/shared/pipes/filter.pipe';
import {SortPipe} from '@app/shared/pipes/sort.pipe';
import {FeatureModule} from '@app/shared/feature.module';
import {VideoService} from '@app/youtube/services/video.service';
import {YoutubeComponent} from '@app/youtube/pages/youtube/youtube.component';
import {RouterOutlet} from '@angular/router';
import {SearchModule} from '@app/youtube/pages/search/search.module';
import {CustomCardService} from '@app/youtube/services/custom-card.service';

@NgModule({
  declarations: [
    CardComponent,
    YoutubeComponent,
    FilterByPipe,
    SortPipe
  ],
  exports: [
    SortPipe,
    FilterByPipe,
    YoutubeComponent
  ],
  imports: [
    NgOptimizedImage,
    NgForOf,
    AsyncPipe,
    FeatureModule,
    RouterOutlet,
    SearchModule
  ],
  providers: [VideoService, CustomCardService]
})
export class YouTubeModule {
}
