import {ComponentFixture, TestBed} from '@angular/core/testing';
import {expect, describe, beforeEach, it} from '@jest/globals';
import {
  FilterSettingComponent
} from '@app/core/components/header/filter-setting/filter-setting.component';
import {SortService} from '@app/youtube/services/sort.service';
import {BehaviorSubject} from 'rxjs';
import {FormsModule} from '@angular/forms';

export class MockSortService {
  searchText$ = new BehaviorSubject<string>('');

  criteria$ = new BehaviorSubject<string>('');

  setSearchText$(text: string): void {
    this.searchText$.next(text);
  }

  onSortDirection(field: string): void {
    this.criteria$.next(field);
  }
}

describe('FilterSettingComponent', () => {
  let component: FilterSettingComponent;
  let fixture: ComponentFixture<FilterSettingComponent>;
  let mockSortService: MockSortService;

  beforeEach(() => {
    mockSortService = new MockSortService();

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [FilterSettingComponent],
      providers: [{ provide: SortService, useValue: mockSortService }]
    });
    fixture = TestBed.createComponent(FilterSettingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update inputValue and searchText based on SortService observables', () => {
    mockSortService.setSearchText$('testSearch');
    mockSortService.onSortDirection('testCriteria');

    fixture.detectChanges();
    expect(component.inputValue).toBe('testSearch');
    expect(component.searchText).toBe('testCriteria');
  });

  it('should call setSearchText$ on onFilter', () => {
    const setSearchTextSpy = jest.spyOn(mockSortService, 'setSearchText$');
    component.inputValue = 'newSearch';

    component.onFilter();

    expect(setSearchTextSpy).toHaveBeenCalledWith('newSearch');
  });

  it('should call onSortDirection on onSort', () => {
    const onSortDirectionSpy = jest.spyOn(mockSortService, 'onSortDirection');
    const testField = 'testField';

    component.onSort(testField);

    expect(onSortDirectionSpy).toHaveBeenCalledWith(testField);
  });
});
