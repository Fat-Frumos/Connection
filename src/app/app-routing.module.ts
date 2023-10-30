import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YouTubeModule} from './youtube/you-tube.module';
import {CoreModule} from './youtube/core.module';
import {PreloadService} from '@app/auth/services/preload.service';
import {authGuard} from '@app/core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () => import('./youtube/you-tube.module')
      .then(module => module.YouTubeModule),
    data: {preload: true},
    canActivate: [authGuard]
  },
  {path: '**', redirectTo: 'main'}
];

@NgModule({
  imports: [
    CoreModule,
    YouTubeModule,
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [PreloadService]
})
export class AppRoutingModule {
}
