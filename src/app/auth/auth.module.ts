import {NgModule} from '@angular/core';
import {
  RegistrationComponent
} from './pages/registration/registration.component';
import {LoginService} from '@app/auth/services/login.service';
import {AuthRoutingModule} from '@app/auth/auth-routing-module';
import {LoginComponent} from '@app/auth/pages/login/login.component';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
  CardCreationComponent
} from './pages/card-creation/card-creation.component';
import {NgForOf, NgIf} from '@angular/common';

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    CardCreationComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class AuthModule {
}
