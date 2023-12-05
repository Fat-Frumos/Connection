import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const uid = localStorage.getItem('uid');
    const email = localStorage.getItem('email');

    if (token && uid && email) {
      request = request.clone({
        setHeaders: {
          'rs-email': email,
          'rs-uid': uid,
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
