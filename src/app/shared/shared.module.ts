import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@app/auth/services/auth-interceptor.service';
import {BASE_URL_TOKEN, baseUrl} from '@app/config';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: BASE_URL_TOKEN,
          useValue: baseUrl,
          multi: true
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<SharedModule> {
    return {
      ngModule:
      SharedModule
    };
  }
}
