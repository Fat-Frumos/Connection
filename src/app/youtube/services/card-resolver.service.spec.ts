import { TestBed } from '@angular/core/testing';

import { CardResolverService } from './card-resolver.service';

describe('CardResolverService', () => {
  let service: CardResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
