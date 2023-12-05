import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {
  LoginInfoComponent
} from '@app/core/components/header/login-info/login-info.component';
import {LoginService} from '@app/auth/services/login.service';
import {of} from 'rxjs';

describe('LoginInfoComponent', () => {
  let component: LoginInfoComponent;
  let loginService: LoginService;

  beforeEach(() => {
    const mockLoginService = {
      getCurrentUser$: jest.fn().mockReturnValue(of(null)),
      logout: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        LoginInfoComponent,
        { provide: LoginService, useValue: mockLoginService }
      ]
    });

    component = TestBed.inject(LoginInfoComponent);
    loginService = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user on creation', () => {
    expect(loginService.getCurrentUser$()).toBeDefined();
  });

  it('should call logout on the service when logout is called', () => {
    const spy = jest.spyOn(loginService, 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });
});
