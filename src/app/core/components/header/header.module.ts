import {NgModule} from '@angular/core';
import {
  LogoComponent
} from '@app/core/components/header/logo/logo.component';
import {
  LoginInfoComponent
} from '@app/core/components/header/login-info/login-info.component';
import {
  SettingsButtonComponent
} from '@app/core/components/header/settings-button/settings-button.component';
import {
  HeaderComponent
} from '@app/core/components/header/header.component';
import {
  FilterSettingComponent
} from '@app/core/components/header/filter-setting/filter-setting.component';
import {FormsModule} from '@angular/forms';
import {HiddenDirective} from '@app/shared/direcrives/hidden.directive';
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
