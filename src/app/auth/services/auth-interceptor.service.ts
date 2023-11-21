import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {keyApi} from '@app/config';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.params.has('key')) {
      return next.handle(req);
    }
    const authReq = req.clone({
      params: req.params.set('key', keyApi)
    });

    console.log('Intercepted Request: ', authReq.urlWithParams);

    return next.handle(authReq);
  }
}
