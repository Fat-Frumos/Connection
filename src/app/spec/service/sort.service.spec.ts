import { TestBed } from '@angular/core/testing';

import { SortService } from '@app/youtube/services/sort.service';

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
