import {NgModule} from '@angular/core';
import {
  SearchRoutingModule
} from '@app/youtube/pages/search/search-routing-module';
import {SearchComponent} from '@app/youtube/pages/search/search.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {
  SearchItemComponent
} from '@app/youtube/components/search-item/search-item.component';
import {
  BorderColorDirective
} from '@app/shared/direcrives/border-color.directive';
import {SharedModule} from '@app/shared/shared.module';
import {FeatureModule} from '@app/shared/feature.module';

@NgModule({
  declarations: [
    BorderColorDirective,
    SearchComponent,
    SearchItemComponent],
  imports: [
    SearchRoutingModule,
    SharedModule,
    FeatureModule,
    AsyncPipe,
    NgForOf
  ],
  exports: [
    SearchComponent,
    BorderColorDirective
  ]

})
export class SearchModule {
}
