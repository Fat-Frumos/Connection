import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from '@app/components/search/search.component';
import {
  SearchItemComponent
} from '@app/components/search/search-item/search-item.component';
import {
  SearchRoutingModule
} from '@app/components/search/search-routing-module';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {VideoService} from '@app/service/video.service';
import {SortPipe} from '@app/pipes/sort.pipe';
import {CardComponent} from '@app/components/search/card/card.component';
import {FilterByPipe} from '@app/pipes/filter.pipe';
import {BorderColorDirective} from '@app/directive/border-color.directive';
import {FeatureModule} from '@app/shared/feature.module';

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
    SearchRoutingModule,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe,
    FeatureModule
  ],
  providers: [BorderColorDirective, VideoService]
})
export class SearchModule {
}
