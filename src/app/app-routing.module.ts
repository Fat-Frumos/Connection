import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreloadService} from '@app/auth/services/preload.service';
import {authGuard} from '@app/core/guards/auth.guard';
import {NotFoundComponent} from '@app/core/pages/not-found/not-found.component';
import {StorageService} from '@app/youtube/services/storage.service';
import {FormService} from '@app/auth/services/form.service';
import {CustomCardService} from '@app/youtube/services/custom-card.service';
import {VideoService} from '@app/youtube/services/video.service';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'not-found', component: NotFoundComponent, canActivate: [authGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./auth/pages/admin/admin.module')
      .then((module) => module.AdminModule)
  },
  {
    path: 'main',
    loadChildren: () => import('@app/youtube/pages/search/search.module')
      .then(module => module.SearchModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/pages/card-creation/card-creation.module')
      .then((module) => module.CardCreationModule)
  },
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [
    FormService,
    StorageService,
    PreloadService,
    VideoService,
    CustomCardService
  ]
})
export class AppRoutingModule {
}
