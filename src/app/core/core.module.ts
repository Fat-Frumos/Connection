import {ModuleWithProviders, NgModule} from '@angular/core';
import {loggerServiceProvider} from '@app/core/services/logger.service';
import {CoreRoutingModule} from '@app/core/core-routing-module';
import {NotFoundModule} from '@app/core/pages/not-found/not-found.module';
import {FooterComponent} from '@app/core/components/footer/footer.component';
import {HeaderModule} from '@app/core/components/header/header.module';
import {VideoService} from '@app/youtube/services/video.service';
import {LoginService} from '@app/auth/services/login.service';
import {SharedModule} from '@app/shared/shared.module';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent, HeaderModule],
  imports: [
    HeaderModule,
    CoreRoutingModule,
    NotFoundModule,
    SharedModule],
  providers: [loggerServiceProvider]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        LoginService,
        VideoService
      ]
    };
  }
}
