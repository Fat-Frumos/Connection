import {Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginInfoComponent {

  public email: string;

  constructor(private loginService: LoginService) {
    this.email = this.loginService.user.email;
  }

  logout(): void {
    this.loginService.logout();
  }
}
