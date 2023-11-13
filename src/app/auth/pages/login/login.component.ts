import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '@app/auth/services/login.service';
import {FormService} from '@app/auth/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  isLoggedIn: boolean;

  isClicked = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required.bind(Validators), this.validator.emailValidator]],
    password: ['', [Validators.required.bind(Validators), this.validator.passwordValidator]]
  });

  constructor(
    private service: LoginService,
    private validator: FormService,
    private formBuilder: FormBuilder) {
    this.isLoggedIn = this.service.isLoggedIn;
  }

  onSubmit(): void {
    this.isClicked = true;
    if (this.isPasswordInvalid() && this.isEmailInvalid()) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const password: string = this.loginForm.value.password ?? '';
    const email: string = this.loginForm.value.email ?? '';
    this.service.login({password, email});
  }

  onSignUp(): void {
    this.service.signup();
  }

  isEmailInvalid() {
    const control = this.loginForm.get('email');
    return control?.invalid && (control?.dirty || control?.touched || this.isClicked);
  }

  isPasswordInvalid() {
    const control = this.loginForm.get('password');
    return control?.invalid && (control?.dirty || control?.touched || this.isClicked);
  }

  getErrorMessage(): string {
    if (this.isEmailInvalid()) {
      return 'Please enter a login email';
    }
    if (this.loginForm.controls.email.errors?.['email']) {
      return 'The login email is invalid';
    }
    if (!this.loginForm?.controls?.password?.value?.trim()) {
      return 'Please enter a password';
    }
    if (this.isClicked && (this.isPasswordInvalid()
      || this.loginForm.controls.password.errors?.['weakPassword'])) {
      return 'Your password isn`t strong enough. It should have at least 8' +
        ' characters, a mixture of both uppercase and lowercase letters, ' +
        'and numbers, and include at least one special character: ! @ # ?';
    }
    return '';
  }
}
