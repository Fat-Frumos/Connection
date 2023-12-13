import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileComponent} from '@app/core/page/profile/profile.component';
import {AsyncPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '', component: ProfileComponent}
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule.forChild(routes),
    AsyncPipe,
    DatePipe,
    NgIf,
    ToastComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  providers:[],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
