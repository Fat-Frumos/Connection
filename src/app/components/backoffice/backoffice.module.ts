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
import {HiddenDirective} from '@app/directive/hidden.directive';
import {BorderColorDirective} from '@app/directive/border-color.directive';
import {FormsModule} from '@angular/forms';
import {SortDirective} from '@app/directive/sort.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    BackofficeComponent,
    DropdownSettingComponent,
    SortDirective,
    HiddenDirective,
    BorderColorDirective
  ],
  exports: [
    BackofficeComponent,
    HiddenDirective,
    SortDirective
  ],
  imports: [
    BackofficeRoutingModule,
    NgIf,
    SearchModule,
    FormsModule
  ],
  providers: [HiddenDirective]
})
export class BackofficeModule {
}
