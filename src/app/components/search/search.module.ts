import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from '@app/components/search/search.component';
import {
  SearchItemComponent
} from '@app/components/search/search-item/search-item.component';
import {
  SearchResultsComponent
} from '@app/components/search/search-results/search-results.component';

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
    HttpClientModule
  ]
})
export class SearchModule {
}
