import { TestBed } from '@angular/core/testing';

import { LoginService } from '../../auth/services/login.service';

describe('AuthService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
