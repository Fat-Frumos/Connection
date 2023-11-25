import {SortPipe} from '@app/shared/pipes/sort.pipe';
import {TestBed} from '@angular/core/testing';
import {SortService} from '@app/youtube/services/sort.service';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(
      'SortService',
      ['getSortField']) as jasmine.SpyObj<SortService>;

    TestBed.configureTestingModule({
      providers: [
        SortPipe,
        {provide: SortService, useValue: spy}
      ]
    });

    pipe = TestBed.inject(SortPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
