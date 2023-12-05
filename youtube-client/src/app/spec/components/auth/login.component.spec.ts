import {ComponentFixture, TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {LoginComponent} from '@app/auth/pages/login/login.component';
import {Router} from '@angular/router';
import {LoginService} from '@app/auth/services/login.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {FormService} from '@app/auth/services/form.service';
import {Store} from '@ngrx/store';
import {User} from '@app/auth/models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginService: jest.Mocked<LoginService>;
  let store: jest.Mocked<Store>;

  beforeEach(() => {
    loginService = {
      fetchUser: jest.fn(),
      getCurrentUser$: jest.fn(() => of({} as User)),
      setCurrentUser$: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      signup: jest.fn()
    } as unknown as jest.Mocked<LoginService>;

    store = {
      dispatch: jest.fn(),
      subscribe: jest.fn()
    } as unknown as jest.Mocked<Store>;

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: LoginService,
          useValue: loginService
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        },
        {
          provide: Store,
          useValue: store
        },
        FormService
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to store on init', () => {
    const subscribeSpy = jest.spyOn(store, 'subscribe');
    component.ngOnInit();
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should return error message if password is invalid', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: '' });
    expect(component.getErrorMessage()).toBe('Please enter a password');
  });

  it('should return the correct error message', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('weak password');
    component.isClicked = true;
    const errorMessage = component.getErrorMessage();
    expect(errorMessage).toContain('Please enter a login email');
    expect(errorMessage).toContain('Please enter a login email');
  });

  it('should return true if email is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['email'].markAsTouched();
    component.loginForm.controls['email'].markAsDirty();
    component.loginForm.controls['email'].setErrors({ required: true });
    expect(component.isEmailInvalid()).toBe(true);
  });

  it('should return true if password is invalid', () => {
    component.loginForm.controls['password'].setValue('');
    component.loginForm.controls['password'].markAsTouched();
    component.loginForm.controls['password'].markAsDirty();
    component.loginForm.controls['password'].setErrors({ required: true });
    expect(component.isPasswordInvalid()).toBe(true);
  });

  it('should correctly identify email validity', () => {
    component.loginForm.controls['email'].setValue('invalid email');
    component.loginForm.controls['email'].markAsTouched();
    component.loginForm.controls['email'].markAsDirty();
    component.loginForm.controls['email'].setErrors({ email: true });
    expect(component.isEmailInvalid()).toBe(true);
  });

  it('should correctly identify password validity', () => {
    component.loginForm.controls['password'].setValue('weak password');
    component.loginForm.controls['password'].markAsTouched();
    component.loginForm.controls['password'].markAsDirty();
    component.loginForm.controls['password'].setErrors({ weakPassword: true });
    expect(component.isPasswordInvalid()).toBe(true);
  });


  it('should call login service on submit', () => {
    const loginSpy = jest.spyOn(loginService, 'login');
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
  });

  it('should navigate to main on submit', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);
  });
});
