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
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {
  CustomCardModule
} from '@app/youtube/components/custom-card/custom-card.module';
import {customCardReducer} from '@app/redux/reducers/custom-card.reducer';
import {CustomCardEffect} from '@app/redux/effects/custom-card.effect';
import {VideoEffects} from '@app/redux/effects/video-item.effect';
import {videoItemReducer} from '@app/redux/reducers/video-item.reducer';
import {favoriteReducer} from '@app/redux/reducers/favorite.reducer';

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
    StoreModule.forRoot({
      customCards: customCardReducer,
      videoState: videoItemReducer,
      favorite: favoriteReducer
    }, {}),
    EffectsModule.forRoot([VideoEffects]),
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
  providers: [PreloadService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
