import {TestBed} from '@angular/core/testing';
import {expect, describe, beforeEach, it} from '@jest/globals';
import {SortService} from '@app/youtube/services/sort.service';
import {Direction} from '@app/shared/models/criteria-model';
import {orderByDate, orderByView} from '@app/spec/interface/model';

describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortService]
    });
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set criteria', () => {
    service.setCriteria$('test');
    service.criteria$.subscribe(value => {
      expect(value).toBe('test');
    });
  });

  it('should set search text', () => {
    service.setSearchText$('test');
    service.searchText$.subscribe(value => {
      expect(value).toBe('test');
    });
  });

  it('should set date direction', () => {
    service.setDateDirection(Direction.DESC);
    service.sortFields$.subscribe(criteria => {
      expect(criteria).toEqual(orderByDate);
    });
  });

  it('should set view direction', () => {
    service.setViewDirection(Direction.DESC);
    service.sortFields$.subscribe(criteria => {
      expect(criteria).toEqual(orderByView);
    });
  });

  it('should toggle direction', () => {
    service.onSortDirection('date');
    service.sortFields$.subscribe(criteria => {
      expect(criteria).toEqual(orderByDate);
    });

    service.onSortDirection('view');
    service.sortFields$.subscribe(criteria => {
      expect(criteria).toEqual(orderByView);
    });
  });
});
