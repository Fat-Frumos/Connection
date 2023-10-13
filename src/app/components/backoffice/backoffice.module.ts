import { NgModule } from '@angular/core';
import { BackofficeComponent } from './backoffice.component';
import {SearchModule} from '@app/components/search/search.module';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  exports: [
    BackofficeComponent
  ],
  imports: [
    SearchModule
  ]
})
export class BackofficeModule { }
