import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {PreloadService} from '@app/auth/services/preload.service';
import {SharedModule} from '@app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from '@app/core/core.module';
import {AuthInterceptor} from '@app/auth/services/auth-interceptor.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {
  CustomCardModule
} from '@app/youtube/components/custom-card/custom-card.module';
import {CustomCardEffect} from '@app/redux/effects/custom-card.effect';
import {VideoEffects} from '@app/redux/effects/video-item.effect';
import {UserEffects} from '@app/redux/effects/user.effect';
import {VideoService} from '@app/youtube/services/video.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    EffectsModule.forRoot([VideoEffects, UserEffects]),
    EffectsModule.forFeature([CustomCardEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: !isDevMode(),
      features: {
        pause: false,
        lock: true,
        export: true
      }
    }),
    CustomCardModule
  ],
  providers: [PreloadService, VideoService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
