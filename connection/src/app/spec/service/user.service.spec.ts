import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {UserService} from '@app/auth/service/user.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {Store} from '@ngrx/store';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, ToastService, Store]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
