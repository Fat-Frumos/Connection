import { TestBed } from '@angular/core/testing';
import { DevLoggerService } from '@app/core/services/logger.service';
import { expect, describe, beforeEach, it } from '@jest/globals';

describe('DevLoggerService', () => {
  let service: DevLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevLoggerService]
    });
    service = TestBed.inject(DevLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

