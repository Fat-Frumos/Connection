import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {authGuard} from '@app/core/guards/auth.guard';
import {LoginService} from '@app/auth/services/login.service';
import {of} from 'rxjs';

describe('authGuard', () => {
  let loginService: LoginService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoginService, useValue: {getCurrentUser$: jest.fn()}},
        {provide: Router, useValue: {createUrlTree: jest.fn()}}
      ]
    });
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should return true if the user is logged in', (done) => {
    (loginService.getCurrentUser$ as jest.Mock).mockReturnValue(of(true));
    authGuard(loginService, router).subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should return false and navigate to /login if the user is not logged in', (done) => {
    (loginService.getCurrentUser$ as jest.Mock).mockReturnValue(of(false));
    const createUrlTreeSpy = jest.spyOn(router, 'createUrlTree');
    authGuard(loginService, router).subscribe((result) => {
      expect(result).toEqual(router.createUrlTree(['/login']));
      expect(createUrlTreeSpy).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
