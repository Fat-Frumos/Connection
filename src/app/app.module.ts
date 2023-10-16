import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {BackofficeModule} from '@app/components/backoffice/backoffice.module';
import {PreloadService} from '@app/shared/service/preload.service';
import {SharedModule} from '@app/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackofficeModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [PreloadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
