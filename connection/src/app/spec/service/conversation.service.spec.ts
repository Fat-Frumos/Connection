import { TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { ConversationService } from '@app/core/service/conversation.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {
  ActionsSubject,
  ReducerManager, ReducerManagerDispatcher,
  StateObservable,
  Store, StoreModule
} from '@ngrx/store';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserReducer} from '@app/ngrx/user/user.reducer';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, Store,
        ConversationService,
        StateObservable, ActionsSubject,
        ReducerManager, ReducerManagerDispatcher],
      imports: [HttpClientTestingModule,
        StoreModule.forRoot(UserReducer)]
    });
    service = TestBed.inject(ConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
