import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorService} from '@app/auth/service/validator.service';
import {UserService} from '@app/auth/service/user.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/error-message.model';
import {RouterService} from '@app/auth/service/router.service';
import {User} from '@app/model/user.model';
import {beginLogin} from '@app/ngrx/user/user.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  loginForm: FormGroup;

  isSubmitting = false;

  isEmailTaken = false;

  constructor(
    private popup: ToastService,
    private store: Store,
    private router: RouterService,
    private userService: UserService,
    private validator: ValidatorService,
    private formBuilder: FormBuilder) {
    this.loginForm = this.validator.getFormGroup(this.formBuilder);
  }

  onSubmit(): void {
    const formUser = this.validator.getFormUser(this.loginForm);
    this.isSubmitting = true;
    this.store.dispatch(beginLogin({authUser: formUser}));
    // this.login(formUser);
  }

  private login(formUser: User) {
    this.userService.login(formUser).subscribe({
      next: (response) => {
        this.popup.show(response.statusText, 'success');
        this.router.navigate(['/']);
      },
      error: (error: ErrorMessage) => {
        this.isSubmitting = false;
        if (error.error.type === 'NotFoundException') {
          this.isEmailTaken = true;
          this.popup.show(error.message, 'warning');
        } else {
          this.popup.show(error.message, 'error');
        }
      }
    });
  }

  isValidEmail(): boolean {
    return this.loginForm.get('email')?.valid ?? false;
  }

  isValidPassword(): boolean {
    return this.loginForm.get('password')?.valid ?? false;
  }
}
