import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorService} from '@app/auth/service/validator.service';
import {RouterService} from '@app/auth/service/router.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {Store} from '@ngrx/store';
import {showAlert} from '@app/ngrx/app/app.action';
import {AuthUser} from '@app/model/user/user-registration.model';
import {ErrorMessage} from '@app/model/error-message.model';
import {UserService} from '@app/auth/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {

  lastRegistrationError: ErrorMessage;

  isSubmitting: boolean = false;

  isEmailTaken: boolean = false;

  registrationForm: FormGroup;

  lastEmail = '';

  constructor(
    private store: Store,
    private userService: UserService,
    private toast: ToastService,
    private router: RouterService,
    private validator: ValidatorService,
    private formBuilder: FormBuilder) {
    this.lastRegistrationError = {} as ErrorMessage;
    this.registrationForm = this.validator.getFormGroup(this.formBuilder);
  }

  onSubmit(): void {
    if (this.isSubmitting || this.registrationForm.invalid) {
      this.store.dispatch(showAlert({
        message: 'Password invalid',
        resultType: 'fail'
      }));
      return;
    }
    this.isSubmitting = true;
    const formUser = this.validator.getFormUser(this.registrationForm);
    this.register(formUser);
  }

  private register(formUser: AuthUser) {
    this.userService.registration(formUser).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toast.showMessage('Registration successful', 'success');
        this.router.navigate(['/sign-in']);
      },
      error: (error: ErrorMessage) => {
        // === 'PrimaryDuplicationException'
        if (error.error) {
          this.isEmailTaken = true;
          this.disableSubmitButton();
          this.lastEmail = formUser.email;
          this.setLastRegistrationError(error);
          this.toast.showMessage('Email is already taken', 'warning');
        } else {
          this.isSubmitting = false;
          this.toast.showMessage(error.message, 'error');
        }
      }
    });
  }

  onEmailChange(email: string): void {
    if (email !== this.lastEmail) {
      this.isEmailTaken = false;
    }
  }

  enableSubmitButton(): void {
    if (!this.registrationForm.enabled) {
      this.registrationForm.enable();
      this.isEmailTaken = false;
    }
  }

  disableSubmitButton(): void {
    this.registrationForm.disable();
  }

  ngOnInit(): void {
    const container = document.querySelector('.container');
    if (container) {
      this.router.togglePanels(true, container);
    }
    this.registrationForm.valueChanges.subscribe(() => {
      this.clearRegistrationError();
      this.enableSubmitButton();
    });
  }

  isValidName(): boolean {
    return this.registrationForm.get('name')?.valid ?? false;
  }

  isValidEmail(): boolean {
    return this.registrationForm.get('email')?.valid ?? false;
  }

  isValidPassword(): boolean {
    return this.registrationForm.get('password')?.valid ?? false;
  }

  clearRegistrationError(): void {
    this.toast.clear(500);
    this.lastRegistrationError = {} as ErrorMessage;
  }

  setLastRegistrationError(error: ErrorMessage): void {
    this.lastRegistrationError = error;
  }

  // dispatch() {
  //   this.store.dispatch(registerUser({user: formUser}));
  //   this.actions$.pipe(
  //     ofType(registerUserSuccess, registerUserFailure)
  //   ).subscribe(action => {
  //     if (action.type === registerUserSuccess.type) {
  //       this.isSubmitting = false;
  //       this.toast.showMessage('Registration successful', 'success');
  //       this.router.navigate(['/sign-in']);
  //     } else if (action.type === registerUserFailure.type) {
  //       const error: string = action.error;
  //       if (error === 'PrimaryDuplicationException') {
  //         this.isEmailTaken = true;
  //         this.disableSubmitButton();
  //         this.lastEmail = formUser.email;
  //         this.setLastRegistrationError(error);
  //         this.toast.showMessage('Email is already taken', 'warning');
  //       } else {
  //         this.isSubmitting = false;
  //         this.toast.showMessage(error, 'error');
  //       }
  //     }
  //   });
  // }
}
