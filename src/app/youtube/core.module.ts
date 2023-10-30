import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from '@app/youtube/pages/main/search.component';
import {
  SearchItemComponent
} from '@app/youtube/components/search-item/search-item.component';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {VideoService} from '@app/youtube/services/video.service';
import {SortPipe} from '@app/shared/pipes/sort.pipe';
import {CardComponent} from '@app/youtube/components/card/card.component';
import {FilterByPipe} from '@app/shared/pipes/filter.pipe';
import {BorderColorDirective} from '@app/shared/direcrives/border-color.directive';
import {FeatureModule} from '@app/shared/feature.module';
import {loggerServiceProvider} from '@app/core/services/logger.service';
import {CoreRoutingModule} from '@app/youtube/core-routing-module';

@NgModule({
  declarations: [
    CardComponent,
    SearchComponent,
    SearchItemComponent,
    BorderColorDirective,
    FilterByPipe,
    SortPipe
  ],
  exports: [
    SortPipe,
    FilterByPipe,
    SearchComponent
  ],
  imports: [
    CoreRoutingModule,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe,
    FeatureModule
  ],
  providers: [BorderColorDirective, VideoService, loggerServiceProvider]
})
export class CoreModule {
}
