import { TestBed } from '@angular/core/testing';

import { CustomCardService } from '../../youtube/services/custom-card.service';

describe('CustomCardService', () => {
  let service: CustomCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
