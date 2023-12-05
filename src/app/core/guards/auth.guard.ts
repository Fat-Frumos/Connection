import {Router, UrlTree} from '@angular/router';
import {LoginService} from '@app/auth/services/login.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export function authGuard(loginService: LoginService, router: Router): Observable<boolean | UrlTree> {
  return loginService.getCurrentUser$().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/login']);
      }
      return true;
    })
  );
}
