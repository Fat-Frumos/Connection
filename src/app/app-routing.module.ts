import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreloadService} from '@app/auth/services/preload.service';
import {VideoService} from '@app/youtube/services/video.service';
import {authGuard} from '@app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main',
    loadChildren: () => import('@app/youtube/pages/youtube/youtube.module')
      .then(module => module.YouTubeModule), canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module')
      .then((module) => module.AuthModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./core/pages/not-found/not-found.module')
      .then((module) => module.NotFoundModule), canActivate: [authGuard]
  },
  {
    path: 'main/:id',
    loadChildren: () => import('@app/youtube/pages/detail-info/detail-info.module')
      .then(module => module.DetailInfoModule)
  },
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [PreloadService, VideoService]
})
export class AppRoutingModule {
}
