import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {LoginService} from '@app/auth/services/login.service';
import {user} from '@app/spec/interface/model';
import {StorageService} from '@app/youtube/services/storage.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginService', () => {
  let service: LoginService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        LoginService,
        {provide: StorageService, useValue: storageService}
      ]
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user', () => {
    localStorage.setItem('user', JSON.stringify(user));

    service.fetchUser().subscribe(storedUser => {
      expect(storedUser).toEqual(user);
    });
  });
  //
  // it('should login user', () => {
  //   const spy = jest.spyOn(storageService, 'login');
  //
  //   service.login(user);
  //   expect(spy).toHaveBeenCalledWith(user);
  // });

  it('should logout user', () => {
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
