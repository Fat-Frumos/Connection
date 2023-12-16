import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorService} from '@app/auth/service/validator.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {Store} from '@ngrx/store';
import {showAlert} from '@app/ngrx/app/app.action';
import {AuthUser} from '@app/model/user/user-registration.model';
import {ErrorMessage} from '@app/model/message/error-message.model';
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

  lastEmail: string = '';

  constructor(
    private store: Store,
    private toast: ToastService,
    private userService: UserService,
    private validator: ValidatorService,
    private formBuilder: FormBuilder) {
    this.lastRegistrationError = {} as ErrorMessage;
    this.registrationForm = this.validator.getFormGroup(this.formBuilder);
  }

  ngOnInit(): void {
    const container = document.querySelector('.container');
    if (container) {
      this.userService.togglePanels(true, container);
    }
    this.registrationForm.valueChanges.subscribe(() => {
      this.clearRegistrationError();
      this.enableSubmitButton();
      this.formChanges();
    });
  }

  onSubmit(): void {
    if (!this.isSubmitting || this.registrationForm.invalid) {
      this.store.dispatch(showAlert({
        message: 'Password invalid',
        resultType: 'fail'
      }));
      return;
    }
    this.isSubmitting = true;
    this.register(this.validator.getFormUser(this.registrationForm));
  }

  private register(formUser: AuthUser): void {
    this.userService.registration(formUser).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toast.showMessage('Registration successful', 'success');
      },
      error: (error: ErrorMessage) => {
        this.handleError(error, formUser);
      }
    });
  }

  private handleError(error: ErrorMessage, formUser: AuthUser): void {
    if (error.error) {
      if (error.error.type === 'PrimaryDuplicationException') {
        this.isEmailTaken = true;
        this.disableSubmitButton();
        this.lastEmail = formUser.email;
        this.lastRegistrationError = error;
        this.toast.showMessage(`Email ${this.lastEmail} is already taken`, 'warning');
      }
      this.isSubmitting = false;
      this.toast.showMessage(error.message, 'error');
    }
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
    this.toast.clear();
    this.lastRegistrationError = {} as ErrorMessage;
  }

  private formChanges(): void {
    if (this.isEmailTaken) {
      this.isEmailTaken = false;
      this.registrationForm.get('email')?.setErrors(null);
    }
  }
}
