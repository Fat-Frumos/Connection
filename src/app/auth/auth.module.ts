import {NgModule} from '@angular/core';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NewCardComponent } from './pages/new-card/new-card.component';
import {LoginService} from '@app/auth/services/login.service';
import {AuthRoutingModule} from '@app/auth/auth-routing-module';
import {LoginComponent} from '@app/auth/pages/login/login.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    NewCardComponent,
    LoginComponent
  ],
  imports: [AuthRoutingModule],
  exports: [],
  providers: [LoginService]
})
export class AuthModule {
}
