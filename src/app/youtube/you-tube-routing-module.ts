import {RouterModule, Routes} from '@angular/router';
import {YoutubeComponent} from '@app/youtube/pages/youtube/youtube.component';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from '@app/core/pages/not-found/not-found.component';
import {CardResolverService} from '@app/youtube/services/card-resolver.service';
import {authGuard} from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: YoutubeComponent,
    children: [
      {path: '', loadChildren: () => import('@app/youtube/core.module')
        .then(module => module.CoreModule)
      },
      {path: 'login', loadChildren: () => import('@app/auth/auth.module')
        .then(module => module.AuthModule)
      },
      {path: 'video/:id/details', resolve: {product: CardResolverService},
        loadChildren: () => import('@app/youtube/detail-info.module')
          .then(module => module.DetailInfoModule), canActivate: [authGuard]},
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YouTubeRoutingModule {
}
