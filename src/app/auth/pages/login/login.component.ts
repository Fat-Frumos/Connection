import {Component, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {LoginService} from '@app/auth/services/login.service';

const MIN_PASSWORD_LENGTH = 8;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  isLoggedIn: boolean;

  isClicked = false;

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /\d/.test(value);
    const hasSpecialChar = /[!@#?]/.test(value);
    const isLengthValid = value.length >= MIN_PASSWORD_LENGTH;
    return !hasUpperCase || !hasLowerCase || !hasNumeric || !hasSpecialChar || !isLengthValid
      ? {'weakPassword': true}
      : null;
  };

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const hasAtSign = value.includes('@');
    const hasDot = value.includes('.');
    return hasAtSign && hasDot ? null : {invalidUsername: true};
  };

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required.bind(Validators), this.emailValidator]],
    password: ['', [Validators.required.bind(Validators), this.passwordValidator]]
  });

  constructor(
    private readonly service: LoginService,
    private formBuilder: FormBuilder) {
    this.isLoggedIn = this.service.isLoggedIn;
  }

  onSubmit(): void {
    this.isClicked = true;
    if (!this.isPasswordInvalid() && !this.isEmailInvalid()) {
      const password: string = this.loginForm.value.password ?? '';
      const email: string = this.loginForm.value.email ?? '';
      this.service.login({password, email});
    } else {
      this.loginForm.markAllAsTouched();
    }
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
    if (this.isClicked && (this.isPasswordInvalid() || this.loginForm.controls.password.errors?.['weakPassword'])) {
      return 'Your password isn`t strong enough. It should have at least 8' +
        ' characters, a mixture of both uppercase and lowercase letters, ' +
        'and numbers, and include at least one special character: ! @ # ?';
    }
    return '';
  }
}
