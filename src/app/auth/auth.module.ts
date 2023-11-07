import {NgModule} from '@angular/core';
import {
  RegistrationComponent
} from './pages/registration/registration.component';
import {LoginService} from '@app/auth/services/login.service';
import {AuthRoutingModule} from '@app/auth/auth-routing-module';
import {LoginComponent} from '@app/auth/pages/login/login.component';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class AuthModule {
}
