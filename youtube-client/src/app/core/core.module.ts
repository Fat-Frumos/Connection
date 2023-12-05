import {ModuleWithProviders, NgModule} from '@angular/core';
import {loggerServiceProvider} from '@app/core/services/logger.service';
import {CoreRoutingModule} from '@app/core/core-routing-module';
import {FooterComponent} from '@app/core/components/footer/footer.component';
import {HeaderModule} from '@app/core/components/header/header.module';
import {VideoService} from '@app/youtube/services/video.service';
import {LoginService} from '@app/auth/services/login.service';
import {SharedModule} from '@app/shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {
  createCardsReducer,
  customCardsReducer
} from '@app/redux/reducers/custom-card.reducer';
import {authReducer, userReducer} from '@app/redux/reducers/user.reducer';
import {favoriteReducer} from '@app/redux/reducers/favorite.reducer';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent, HeaderModule],
  imports: [
    HeaderModule,
    CoreRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      favorite: favoriteReducer,
      customCard: customCardsReducer, createCardsReducer,
      auth: authReducer,
      user: userReducer
    }, {})],
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
