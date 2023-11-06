import {NgModule} from '@angular/core';
import {
  NotFoundRoutingModule
} from '@app/core/pages/not-found/not-found-routing-module';
import {NotFoundComponent} from '@app/core/pages/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
