import {Router, UrlTree} from '@angular/router';
import {LoginService} from '@app/auth/services/login.service';
import {inject} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function authGuard(): Observable<boolean | UrlTree> {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.getCurrentUser$().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.createUrlTree(['/login']);
        return false;
      }
      return true;
    })
  );
}
