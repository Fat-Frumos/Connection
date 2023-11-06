import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginInfoComponent implements OnInit {
  public username: string;

  constructor(private loginService: LoginService) {
    this.username = '';
  }

  ngOnInit(): void {
    this.loginService.user$.subscribe(user => {
      this.username = user ? user.username : '';
    });
  }

  logout(): void {
    this.loginService.logout();
  }
}
