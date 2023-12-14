import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreloadService} from '@app/auth/service/preload.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {authGuard} from '@app/auth/service/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ConversationComponent
} from '@app/core/page/conversation/conversation.component';
import {
  NotFoundComponent
} from '@app/core/component/not-found/not-found.component';

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
  },
  {
    path: 'group', canActivate: [authGuard],
    loadChildren: () => import('@app/core/component/chat/chat.module')
      .then((module) => module.ChatModule)
  },
  {
    path: 'conversation', canActivate: [authGuard],
    loadChildren: () => import('@app/core/page/conversation/conversation.module')
      .then((module) => module.ConversationModule)
  },
  {
    path: 'conversation/:id', component: ConversationComponent, canActivate: [authGuard]
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [HttpClient, PreloadService]
})
export class AppRoutingModule {
}
