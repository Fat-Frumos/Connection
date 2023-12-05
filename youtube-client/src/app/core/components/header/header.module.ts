import {NgModule} from '@angular/core';
import {LogoComponent} from '@app/core/components/header/logo/logo.component';
import {
  LoginInfoComponent
} from '@app/core/components/header/login-info/login-info.component';
import {
  SettingsButtonComponent
} from '@app/core/components/header/settings-button/settings-button.component';
import {HeaderComponent} from '@app/core/components/header/header.component';
import {
  FilterSettingComponent
} from '@app/core/components/header/filter-setting/filter-setting.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeatureModule} from '@app/shared/feature.module';
import {HiddenDirective} from '@app/shared/directives/hidden.directive';
import {RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@NgModule({
  declarations: [
    LogoComponent,
    LoginInfoComponent,
    SettingsButtonComponent,
    HeaderComponent,
    FilterSettingComponent,
    HiddenDirective
  ],
  imports: [
    ReactiveFormsModule,
    FeatureModule,
    RouterLink,
    AsyncPipe,
    FormsModule
  ], exports: [
    HeaderComponent,
    HiddenDirective
  ],
  providers: [HiddenDirective]
})
export class HeaderModule {
}
