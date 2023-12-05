import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {PreloadService} from '@app/auth/services/preload.service';
import {Route} from '@angular/router';
import {of} from 'rxjs';

describe('PreloadService', () => {
  let service: PreloadService;
  const PRELOAD_DELAY_MS = 5000;
  const route: Route = {path: 'test'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadService]
    });
    service = TestBed.inject(PreloadService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delay preloading by PRELOAD_DELAY_MS', (done) => {
    const startTime = Date.now();

    service.preload(route, () => of(null)).subscribe(() => {
      const endTime = Date.now();
      const delay = endTime - startTime;

      expect(delay).toBeGreaterThanOrEqual(PRELOAD_DELAY_MS);
      done();
    });
  }, PRELOAD_DELAY_MS + 1000);
});
