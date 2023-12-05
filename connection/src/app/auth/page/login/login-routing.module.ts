import {RouterLink, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from '@app/auth/page/login/login.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  RegistrationComponent
} from '@app/auth/page/registration/registration.component';
import {SwiperComponent} from '@app/auth/component/swiper/swiper.component';
import {
  FormMessageComponent
} from '@app/auth/component/form-message/form-message.component';

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
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
