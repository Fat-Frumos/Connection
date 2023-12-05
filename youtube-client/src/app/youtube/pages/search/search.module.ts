import {NgModule} from '@angular/core';
import {
  SearchRoutingModule
} from '@app/youtube/pages/search/search-routing-module';
import {SearchComponent} from '@app/youtube/pages/search/search.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {
  SearchItemComponent
} from '@app/youtube/components/search-item/search-item.component';
import {
  BorderColorDirective
} from '@app/shared/directives/border-color.directive';
import {SharedModule} from '@app/shared/shared.module';
import {FeatureModule} from '@app/shared/feature.module';
import {SortPipe} from '@app/shared/pipes/sort.pipe';
import {FilterByPipe} from '@app/shared/pipes/filter.pipe';
import {AuthModule} from '@app/auth/auth.module';

@NgModule({
  declarations: [
    BorderColorDirective,
    SearchComponent,
    FilterByPipe,
    SortPipe,
    SearchItemComponent
  ],
  imports: [
    SearchRoutingModule,
    SharedModule,
    FeatureModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    AuthModule
  ],
  exports: [
    SortPipe,
    SearchComponent,
    BorderColorDirective
  ]

})
export class SearchModule {
}
