import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '@app/auth/services/login.service';
import {FormService} from '@app/auth/services/form.service';
import {User} from '@app/auth/models/user';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;

  isClicked = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required.bind(Validators), this.validator.emailValidator]],
    password: ['', [Validators.required.bind(Validators), this.validator.passwordValidator]]
  });

  constructor(
    private store: Store,
    private service: LoginService,
    private validator: FormService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.isLoggedIn = !!this.service.user;
  }

  onSubmit(): void {
    this.isClicked = true;
    if (this.isPasswordInvalid() && this.isEmailInvalid()) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user: User = {
      password: this.loginForm.value.password ?? '',
      email: this.loginForm.value.email ?? ''
    };
    this.service.login(user);
    this.router.navigate(['/main']).catch(error => {
      console.error('Navigation error:', error);
    });
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

  ngOnInit(): void {
    this.store.subscribe(console.log);
  }
}
