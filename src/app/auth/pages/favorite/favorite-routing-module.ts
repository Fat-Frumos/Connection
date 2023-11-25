import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FavoriteComponent} from '@app/auth/pages/favorite/components/favorite.component';

const routes: Routes = [
  {path: 'favorite', component: FavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRoutingModule {
}
