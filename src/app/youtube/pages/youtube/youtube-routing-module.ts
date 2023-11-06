import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FeatureModule} from '@app/shared/feature.module';
import {YoutubeComponent} from '@app/youtube/pages/youtube/youtube.component';
import {CardResolverService} from '@app/youtube/services/card-resolver.service';
import {authGuard} from '@app/core/guards/auth.guard';
import {SharedModule} from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: '', component: YoutubeComponent,
    children: [
      {path: '', loadChildren: () => import('@app/youtube/pages/search/search.module')
        .then(module => module.SearchModule)},
      {path: 'not-found', loadChildren: () => import('@app/core/core.module')
        .then(module => module.CoreModule)
      },
      {path: 'login', loadChildren: () => import('@app/auth/auth.module')
        .then(module => module.AuthModule)
      },
      {path: 'home/:id/details', resolve: {product: CardResolverService},
        loadChildren: () => import('@app/youtube/pages/detail-info/detail-info.module')
          .then(module => module.DetailInfoModule), canActivate: [authGuard]},
      {path: '**', redirectTo: 'not-found'}
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    FeatureModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YouTubeRoutingModule {
}
