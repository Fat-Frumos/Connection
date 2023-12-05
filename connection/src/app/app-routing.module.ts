import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreloadService} from '@app/auth/service/preload.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {authGuard} from '@app/auth/service/auth.guard';

const routes: Routes = [

  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: 'signin',
    loadChildren: () => import('@app/auth/page/login/login.module')
      .then((module) => module.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('@app/auth/page/registration/registration.module')
      .then((module) => module.RegistrationModule)
  },
  {
    path: 'profile', canActivate: [authGuard],
    loadChildren: () => import('@app/core/page/profile/profile.module')
      .then((module) => module.ProfileModule)
  },
  {
    path: '', canActivate: [authGuard],
    loadChildren: () => import('@app/core/page/main/main.module')
      .then((module) => module.MainModule)
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [HttpClient, PreloadService]
})
export class AppRoutingModule {
}
