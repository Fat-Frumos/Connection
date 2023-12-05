import {TestBed} from '@angular/core/testing';
import {ProdLoggerService} from '@app/core/services/logger.service';
import {beforeEach, describe, expect, it} from '@jest/globals';

describe('ProdLoggerService', () => {
  let service: ProdLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProdLoggerService]
    });
    service = TestBed.inject(ProdLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
