import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {PreloadService} from '@app/auth/services/preload.service';
import {SharedModule} from '@app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';
import {NotFoundComponent} from './core/pages/not-found/not-found.component';
import {FormsModule} from '@angular/forms';
import {YouTubeModule} from '@app/youtube/you-tube.module';

@NgModule({
  declarations: [
    AppComponent,
    DetailInfoComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    YouTubeModule
  ],
  providers: [PreloadService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
