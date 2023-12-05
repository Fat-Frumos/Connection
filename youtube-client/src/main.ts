import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from '@app/app.module';
import {environment} from './environments/environment';
import {enableProdMode, ViewEncapsulation} from '@angular/core';

platformBrowserDynamic().bootstrapModule(AppModule, {
  defaultEncapsulation: ViewEncapsulation.None
}).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker
      .register('/service-worker.js').then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed: ', error);
      });
  }
}).catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('Service Worker registered');
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  }
}
