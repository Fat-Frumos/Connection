import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from '@app/youtube/pages/search/search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {VideoService} from '@app/youtube/services/video.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Pipe, PipeTransform, Type} from '@angular/core';
import {SortService} from '@app/youtube/services/sort.service';
import {StorageService} from '@app/youtube/services/storage.service';
import {setCurrentPage} from '@app/redux/actions/custom-card.action';
import {fetchUser} from '@app/redux/actions/user.actions';
import {Subscription} from 'rxjs';
import {
  PaginationComponent
} from '@app/auth/components/pagination/pagination.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: MockStore<Record<string, unknown>>;
  let videoService: VideoService;
  let sortService: SortService;

  @Pipe({name: 'sortBy'})
  class SortPipeStub implements PipeTransform {
    transform(value: unknown): unknown {
      return value;
    }
  }

  @Pipe({name: 'filterBy'})
  class FilterByPipeStub implements PipeTransform {
    transform(value: unknown): unknown {
      return value;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchComponent, FilterByPipeStub, SortPipeStub, PaginationComponent],
      providers: [VideoService, StorageService, SortService, provideMockStore()]
    });
    fixture = TestBed.createComponent(SearchComponent);
    store = TestBed.inject(MockStore as Type<MockStore<Record<string, unknown>>>);
    videoService = TestBed.inject(VideoService);
    sortService = TestBed.inject(SortService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have videos$ observable', () => {
    expect(component.videos$).toEqual(videoService.videos$);
  });

  it('should dispatch fetchUser action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(fetchUser());
  });

  it('should dispatch setCurrentPage action on changePage', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const newPage = 2;
    component.changePage(newPage);
    expect(dispatchSpy).toHaveBeenCalledWith(setCurrentPage({currentPage: newPage}));
  });

  it('should unsubscribe all subscriptions on destroy', () => {
    const subscription = new Subscription();
    const unsubscribeSpy = jest.spyOn(subscription, 'unsubscribe');
    component['subscriptions'].push(subscription);
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should dispatch fetchUser action on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(fetchUser());
  });

  it('should subscribe to searchText$ observable on init', () => {
    const subscribeSpy = jest.spyOn(sortService.searchText$, 'subscribe');
    component.ngOnInit();
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should subscribe to sortFields$ observable on init', () => {
    const subscribeSpy = jest.spyOn(sortService.sortFields$, 'subscribe');
    component.ngOnInit();
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should subscribe to criteria$ observable on init', () => {
    const subscribeSpy = jest.spyOn(sortService.criteria$, 'subscribe');
    component.ngOnInit();
    expect(subscribeSpy).toHaveBeenCalled();
  });
});
