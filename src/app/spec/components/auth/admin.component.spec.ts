import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminComponent} from '@app/auth/pages/admin/admin.component';
import {beforeEach, describe, expect, it} from '@jest/globals';

import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {VideoService} from '@app/youtube/services/video.service';
import {of, Subject} from 'rxjs';
import {selectCurrentPage} from '@app/redux/selectors/pagination.selector';
import {selectAllCustomCards} from '@app/redux/selectors/custom-card.selector';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {
  PaginationComponent
} from '@app/auth/components/pagination/pagination.component';
import {Type} from '@angular/core';
import {customCards} from '@app/spec/interface/model';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let store: MockStore<Record<string, unknown>>;
  let videos$: Subject<unknown>;

  beforeEach(() => {
    videos$ = new Subject<unknown>();
    TestBed.configureTestingModule({
      declarations: [AdminComponent, PaginationComponent],
      providers: [
        provideMockStore(),
        {
          provide: VideoService,
          useValue: {
            videos$: videos$.asObservable()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore as Type<MockStore<Record<string, unknown>>>);
    store.overrideSelector(selectAllCustomCards, []);
    store.overrideSelector(selectCurrentPage, 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update totalPages on initialization', () => {
    store.overrideSelector(selectAllCustomCards, [{id: {videoId: '1'}} as CustomCard]);
    component.ngOnInit();
    expect(component.totalPages).toBe(1);
  });

  it('should update totalPages on initialization', () => {
    store.overrideSelector(selectAllCustomCards, [{id: {videoId: '1'}} as CustomCard]);
    component.ngOnInit();
    expect(component.totalPages).toBe(1);
  });

  it('should toggle favorite', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.toggleFavorite('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should add custom card', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.addCustomCard(customCards[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('should delete custom card', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.deleteCustomCard('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should change page', () => {
    const spy = jest.spyOn(store, 'dispatch');
    component.changePage(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should track by custom card', () => {
    expect(component.trackByCustomCard(0, customCards[0])).toEqual('videoId1');
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should calculate total pages on init', () => {
    jest.spyOn(store, 'pipe').mockReturnValue(of([1, 2, 3, 4, 5]));
    component.ngOnInit();
    expect(component.totalPages).toEqual(1);
  });
});
