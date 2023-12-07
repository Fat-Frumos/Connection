import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UserReducer} from '@app/ngrx/user/user.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '@app/shared/shared.module';
import {AuthInterceptor} from '@app/auth/service/auth.interceptor';
import {AppRoutingModule} from '@app/app-routing.module';
import {UserEffects} from '@app/ngrx/user/user.effects';
import {
  loadProfileReducer,
  updateProfileReducer
} from '@app/ngrx/profile/profile.reducer';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {AppEffects} from '@app/ngrx/app/app.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    StoreModule.forRoot({
      user: UserReducer,
      profile: loadProfileReducer, updateProfileReducer
    }),
    EffectsModule.forRoot([UserEffects, AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: !isDevMode(),
      features: {
        pause: false,
        lock: true,
        export: true
      }
    }),
    ToastComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
