import {TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it} from '@jest/globals';
import {AuthInterceptor} from '@app/auth/service/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    });
    interceptor = TestBed.inject(HTTP_INTERCEPTORS)[0] as AuthInterceptor;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });


  it('should add headers to the request', () => {
    const userEmail = 'test@i.ua';
    const userId = '123';
    const authToken = 'test';
    localStorage.setItem('uid', userId);
    localStorage.setItem('email', userEmail);
    localStorage.setItem('token', authToken);
    localStorage.setItem('Authorization', authToken);
    httpClient.get('/api').subscribe();

    const httpRequest = httpMock.expectOne('/api');
    expect(httpRequest.request.headers.has('rs-email')).toEqual(true);
    expect(httpRequest.request.headers.get('rs-email')).toEqual(userEmail);
    expect(httpRequest.request.headers.has('rs-uid')).toEqual(true);
    expect(httpRequest.request.headers.get('rs-uid')).toEqual(userId);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual(`Bearer ${authToken}`);

    httpRequest.flush({data: 'test'});
    httpMock.verify();
  });

});
