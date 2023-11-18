import { TestBed } from '@angular/core/testing';

import { FormService } from '@app/auth/services/form.service';

describe('ValidationService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
