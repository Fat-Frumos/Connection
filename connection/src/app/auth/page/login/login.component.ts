import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ValidatorService} from '@app/auth/service/validator.service';
import {UserService} from '@app/auth/service/user.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {RouterService} from '@app/auth/service/router.service';
import {AuthUser} from '@app/model/user/user-registration.model';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  isSubmitting = false;

  isEmailTaken = false;

  private destroy$ = new Subject<void>();

  constructor(
    private popup: ToastService,
    private router: RouterService,
    private userService: UserService,
    private validator: ValidatorService,
    private formBuilder: FormBuilder) {
    this.loginForm = this.validator.getFormGroup(this.formBuilder);
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initLoginForm() {
    this.loginForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isEmailTaken = false;
    });
  }

  onSubmit(): void {
    const formUser = this.validator.getFormUser(this.loginForm);
    this.login(formUser);
  }

  private login(formUser: AuthUser) {
    if (!this.isSubmitting) {
      this.userService.login(formUser).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          this.popup.showMessage(response.statusText, 'success');
          this.isSubmitting = true;
          this.router.navigate(['/']);
        },
        error: (error: ErrorMessage) => {
          this.isSubmitting = false;
          if (error.error.type === 'NotFoundException') {
            this.isEmailTaken = true;
            this.popup.showMessage(error.message, 'warning');
          } else {
            this.popup.showMessage(error.message, 'error');
          }
        }
      });
    }
  }

  isValidEmail(): boolean {
    return this.loginForm.get('email')?.valid ?? false;
  }

  isValidPassword(): boolean {
    return this.loginForm.get('password')?.valid ?? false;
  }
}
