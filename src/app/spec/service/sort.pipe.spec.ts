import {SortPipe} from '@app/pipes/sort.pipe';
import {TestBed} from '@angular/core/testing';
import {SortService} from '@app/service/sort.service';

describe('SortPipe', () => {
  let pipe: SortPipe;
  let sortService: jasmine.SpyObj<SortService>;

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
    sortService = TestBed.inject(SortService) as jasmine.SpyObj<SortService>;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // it('should return empty array if videos is not defined', () => {
  //   expect(pipe.transform([], of('date'), '', SortDirection.ASC)).toEqual([]);
  // });
});
