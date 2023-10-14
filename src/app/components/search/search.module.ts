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

@NgModule({
  declarations: [
    SearchComponent,
    SearchItemComponent,
    SearchResultsComponent
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    SearchRoutingModule,
    HttpClientModule,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe
  ],
  providers: [VideoService]
})
export class SearchModule {
}
