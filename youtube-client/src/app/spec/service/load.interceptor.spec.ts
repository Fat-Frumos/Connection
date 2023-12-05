import {TestBed} from '@angular/core/testing';
import {expect, describe, beforeEach, it} from '@jest/globals';
import {AuthInterceptor} from '@app/auth/services/auth-interceptor.service';

describe('LoadInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor
      ]
    });
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});


