import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorService} from '@app/auth/service/validator.service';
import {UserService} from '@app/auth/service/user.service';
import {RouterService} from '@app/auth/service/router.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/error-message.model';
import {Store} from '@ngrx/store';
import {showAlert} from '@app/ngrx/app/app.action';
import {User} from '@app/model/user.model';
import {beginRegister, registerUser} from '@app/ngrx/user/user.actions';

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
    private toast: ToastService,
    private router: RouterService,
    private userService: UserService,
    private validator: ValidatorService,
    private formBuilder: FormBuilder) {
    this.lastRegistrationError = {} as ErrorMessage;
    this.registrationForm = this.validator.getFormGroup(this.formBuilder);
  }

  onSubmit(): void {
    if (this.isSubmitting || this.registrationForm.invalid) {
      this.store.dispatch(showAlert({message: 'Password invalid', resultType: 'fail'}));
      return;
    }
    this.isSubmitting = true;
    const formUser = this.validator.getFormUser(this.registrationForm);
    console.log(formUser);
    this.store.dispatch(registerUser({ user: formUser }));
  }
    // this.register(formUser);

  private register(formUser: User) {
    this.userService.registration(formUser).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.toast.show('Registration successful', 'success');
        this.router.navigate(['/sign-in']);
      },
      error: (error: ErrorMessage) => {
        if (error.error.type === 'PrimaryDuplicationException') {
          this.isEmailTaken = true;
          this.disableSubmitButton();
          this.lastEmail = formUser.email;
          this.setLastRegistrationError(error);
          this.toast.show('Email is already taken', 'warning');
        } else {
          this.isSubmitting = false;
          this.toast.show(error.message, 'error');
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
    this.toast.clear();
    this.lastRegistrationError = {} as ErrorMessage;
  }

  setLastRegistrationError(error: ErrorMessage): void {
    this.lastRegistrationError = error;
  }
}
