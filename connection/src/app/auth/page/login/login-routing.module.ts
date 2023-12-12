import {RouterLink, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from '@app/auth/page/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  RegistrationComponent
} from '@app/auth/page/registration/registration.component';
import {SwiperComponent} from '@app/auth/component/swiper/swiper.component';
import {
  FormMessageComponent
} from '@app/auth/component/form-message/form-message.component';
import {NgClass, NgIf} from '@angular/common';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    SwiperComponent,
    FormMessageComponent
  ],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgClass,
    NgIf
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
