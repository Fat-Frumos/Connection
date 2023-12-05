import {NgModule} from '@angular/core';
import {FavoriteComponent} from './components/favorite.component';
import {FavoriteRoutingModule} from '@app/auth/pages/favorite/favorite-routing-module';
import {AsyncPipe, NgForOf} from '@angular/common';


@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    FavoriteRoutingModule,
    NgForOf,
    AsyncPipe
  ]
})
export class FavoriteModule {
}
