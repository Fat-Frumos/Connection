import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login-info',
  templateUrl: './login-info.component.html',
  styleUrls: ['./login-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginInfoComponent implements OnDestroy {
  public username: string;

  private subscription: Subscription;


  constructor(private loginService: LoginService) {
    this.username = '';
    this.subscription = this.loginService.user$.subscribe(user => {
      this.username = user.username;
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
