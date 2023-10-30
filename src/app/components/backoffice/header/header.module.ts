import {NgModule} from '@angular/core';
import {
  LogoComponent
} from '@app/components/backoffice/header/logo/logo.component';
import {
  LoginInfoComponent
} from '@app/components/backoffice/header/login-info/login-info.component';
import {
  SettingsButtonComponent
} from '@app/components/backoffice/header/settings-button/settings-button.component';
import {
  HeaderComponent
} from '@app/components/backoffice/header/header.component';
import {
  FilterSettingComponent
} from '@app/components/backoffice/filter-setting/filter-setting.component';
import {FormsModule} from '@angular/forms';
import {HiddenDirective} from '@app/directive/hidden.directive';
import {FeatureModule} from '@app/shared/feature.module';

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
    FormsModule,
    FeatureModule
  ], exports: [
    HeaderComponent,
    HiddenDirective
  ],
  providers: [HiddenDirective]
})
export class HeaderModule {
}