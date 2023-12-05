import {RouterLink, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from '@app/auth/page/registration/registration.component';
import {ToastComponent} from '@app/shared/component/toast/toast.component';


const routes: Routes = [
  {path: '', component: RegistrationComponent}
];

@NgModule({
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ToastComponent
  ],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
