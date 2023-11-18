import {NgModule} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';
import {AuthRoutingModule} from '@app/auth/auth-routing-module';
import {LoginComponent} from '@app/auth/pages/login/login.component';
import {SharedModule} from '@app/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {
  CardCreationComponent
} from './pages/card-creation/card-creation.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    LoginComponent,
    CardCreationComponent,
    AdminComponent,
    PaginationComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class AuthModule {
}
