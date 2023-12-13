import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {GroupService} from '@app/core/service/group.service';
import {
  ActionsSubject,
  ReducerManager, ReducerManagerDispatcher,
  StateObservable,
  Store, StoreModule
} from '@ngrx/store';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserReducer} from '@app/ngrx/user/user.reducer';

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, Store, GroupService,
        StateObservable, ActionsSubject,
        ReducerManager, ReducerManagerDispatcher],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
