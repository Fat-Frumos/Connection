import {ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BASE_URL_TOKEN, baseUrl} from '@app/config';
import {AuthInterceptor} from '@app/auth/service/auth.interceptor';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {NavbarComponent} from '@app/shared/component/navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    ReactiveFormsModule,
    ToastComponent,
    CommonModule,
    RouterLink
  ],
  exports: [
    NavbarComponent
  ],
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
        ToastService,
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
