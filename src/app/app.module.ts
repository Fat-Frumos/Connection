import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/backoffice/header/header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {BackofficeModule} from '@app/components/backoffice/backoffice.module';
import {PreloadService} from '@app/shared/service/preload.service';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BackofficeModule
  ],
  providers: [PreloadService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
