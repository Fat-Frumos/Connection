import {Component, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {LoginService} from '@app/auth/services/login.service';
import {User} from '@app/auth/models/user';

const MIN_PASSWORD_LENGTH = 8;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {


  isLoggedIn: boolean;

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /\d/.test(value);
    const hasSpecialChar = /[!@#?]/.test(value);
    const isLengthValid = value.length >= MIN_PASSWORD_LENGTH;
    return hasUpperCase && hasLowerCase && hasNumeric
    && hasSpecialChar && isLengthValid
      ? null : {weakPassword: true};
  };

  usernameValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const isAlphanumeric = /^[a-z0-9]+$/i.test(value);
    return isAlphanumeric ? null : {invalidUsername: true};
  };


  loginForm = this.fb.group({
    email: ['', [Validators.required.bind(Validators), Validators.email.bind(Validators)]],
    username: ['', [Validators.required.bind(Validators), this.usernameValidator]],
    password: ['', [Validators.required.bind(Validators), this.passwordValidator]]
  });

  constructor(
    private readonly service: LoginService,
    private fb: FormBuilder) {
    this.isLoggedIn = this.service.isLoggedIn;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      const username = this.loginForm.value.password ?? '';
      const user: User = {email, password, username};
      this.service.login(user);
    }
  }
}
