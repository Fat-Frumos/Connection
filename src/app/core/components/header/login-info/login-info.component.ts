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

  public email: string;

  private subscription: Subscription;


  constructor(private loginService: LoginService) {
    this.email = '';
    this.subscription = this.loginService.user$.subscribe(user => {
      this.email = user.email;
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
