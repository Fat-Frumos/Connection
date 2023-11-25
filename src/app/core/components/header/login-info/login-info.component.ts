import {Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';
import {Observable} from 'rxjs';
import {User} from '@app/auth/models/user';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginInfoComponent {

  public user: Observable<User>;

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getCurrentUser$();
  }

  logout(): void {
    this.loginService.logout();
  }
}
