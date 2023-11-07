import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {authGuard} from '@app/core/guards/auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = () =>
    TestBed.runInInjectionContext(() => authGuard());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
