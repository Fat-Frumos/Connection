import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {User} from '@app/auth/models/user';
import {LoginService} from '@app/auth/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public loginForm;

  constructor(
    private readonly service: LoginService,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (): void => {
    if (this.loginForm.valid) {
      const user: User = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      } as User;
      this.service.login(user);
    } else {
      alert('Please fill in both fields.');
    }
  };
}
