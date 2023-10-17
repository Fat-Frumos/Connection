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
import {CriteriaFilterPipe} from '@app/pipes/criteria-filter.pipe';
import {SortFilterPipe} from '@app/pipes/sort-filter.pipe';
import {CardComponent} from '@app/components/search/card/card.component';
import {HiddenDirective} from '@app/directive/hidden.directive';

@NgModule({
  declarations: [
    CardComponent,
    SearchComponent,
    SearchItemComponent,
    CriteriaFilterPipe,
    SortFilterPipe,
    HiddenDirective
  ],
  exports: [
    SearchComponent,
    CriteriaFilterPipe,
    SortFilterPipe,
    HiddenDirective
  ],
  imports: [
    SearchRoutingModule,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe
  ],
  providers: [VideoService, HiddenDirective]
})
export class SearchModule {
}
