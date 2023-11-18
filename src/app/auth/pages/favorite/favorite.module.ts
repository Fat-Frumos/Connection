import {NgModule} from '@angular/core';
import {FavoriteComponent} from './components/favorite.component';
import {FavoriteRoutingModule} from '@app/auth/pages/favorite/favorite-routing-module';


@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    FavoriteRoutingModule
  ]
})
export class FavoriteModule {
}
