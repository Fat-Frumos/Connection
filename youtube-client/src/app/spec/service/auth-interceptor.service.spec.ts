import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from '@app/auth/services/auth-interceptor.service';
import {keyApi} from '@app/config';
import {beforeEach, describe, expect, it} from '@jest/globals';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an API key to requests', () => {
    http.get('/test').subscribe();
    const req: TestRequest = httpMock.expectOne(request =>
      request.urlWithParams.includes('/test?key='));
    expect(req.request.params.has('key')).toBe(true);
    expect(req.request.params.get('key')).toBe(keyApi);
  });

  it('should not add an API key if one is already present', () => {
    http.get('/test', {params: {key: 'existingKey'}}).subscribe();
    const req: TestRequest = httpMock.expectOne(request =>
      request.urlWithParams.includes('/test?key=existingKey'));
    expect(req.request.params.get('key')).toBe('existingKey');
  });
});
