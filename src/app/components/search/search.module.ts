import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from '@app/components/search/search.component';
import {
  SearchItemComponent
} from '@app/components/search/search-item/search-item.component';
import {
  SearchResultsComponent
} from '@app/components/search/search-results/search-results.component';
import {
  SearchRoutingModule
} from '@app/components/search/search-routing-module';
import {AsyncPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {VideoService} from '@app/service/video.service';
import {SearchService} from '@app/service/search.service';
import {CriteriaFilterPipe} from '@app/pipes/criteria-filter.pipe';

@NgModule({
  declarations: [
    SearchComponent,
    SearchItemComponent,
    SearchResultsComponent,
    CriteriaFilterPipe
  ],
  exports: [
    SearchComponent,
    CriteriaFilterPipe
  ],
  imports: [
    SearchRoutingModule,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe
  ],
  providers: [VideoService, SearchService]
})
export class SearchModule {
}
