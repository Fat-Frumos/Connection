import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {CustomCardService} from '@app/youtube/services/custom-card.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {customCards} from '@app/spec/interface/model';
import {Type} from '@angular/core';

describe('CustomCardService', () => {
  let service: CustomCardService;
  let store: MockStore<Record<string, unknown>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomCardService,
        provideMockStore()
      ]
    });

    service = TestBed.inject(CustomCardService);
    store = TestBed.inject(MockStore as Type<MockStore<Record<string, unknown>>>);
  });

  it('should dispatch deleteCard action', () => {
    const id = '1';
    const action = {type: '[Custom Card] Delete', payload: id};
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    service.deleteCard(id);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should dispatch saveCustomCard action', () => {
    const action = {type: '[Custom Card] Add', payload: customCards[0]};
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    service.saveCustomCard(customCards[0]);
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
