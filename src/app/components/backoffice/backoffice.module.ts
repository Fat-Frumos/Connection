import {NgModule} from '@angular/core';
import {BackofficeComponent} from './backoffice.component';
import {
  BackofficeRoutingModule
} from '@app/components/backoffice/backoffice-routing-module';
import {SearchModule} from '@app/components/backoffice/search/search.module';
import {HeaderModule} from '@app/components/backoffice/header/header.module';
import {AsyncPipe} from '@angular/common';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  exports: [
    BackofficeComponent
  ],
  imports: [
    BackofficeRoutingModule,
    SearchModule,
    HeaderModule,

    AsyncPipe
  ]
})
export class BackofficeModule {
}
