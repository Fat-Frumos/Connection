import {NgModule} from '@angular/core';
import {BackofficeComponent} from './backoffice.component';
import {
  BackofficeRoutingModule
} from '@app/components/backoffice/backoffice-routing-module';
import {SearchModule} from '@app/components/search/search.module';
import {
  DropdownSettingComponent
} from '@app/components/backoffice/header/dropdown-setting/dropdown-setting.component';
import {
  HeaderComponent
} from '@app/components/backoffice/header/header.component';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    BackofficeComponent,
    DropdownSettingComponent
  ],
  exports: [
    BackofficeComponent
  ],
  imports: [
    SearchModule,
    BackofficeRoutingModule,
    NgIf
  ]
})
export class BackofficeModule {
}
