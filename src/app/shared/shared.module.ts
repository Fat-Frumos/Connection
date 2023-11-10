import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '@app/auth/services/auth-interceptor.service';
import {
  BASE_URL_TOKEN,
  URL_API_TOKEN,
  KEY_URL_TOKEN,
  baseUrl,
  keyApi,
  urlApi
} from '@app/config';

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
        },
        {
          provide: URL_API_TOKEN,
          useValue: urlApi,
          multi: true
        },
        {
          provide: KEY_URL_TOKEN,
          useValue: keyApi,
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
