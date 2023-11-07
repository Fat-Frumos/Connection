import {Router, UrlTree} from '@angular/router';
import {LoginService} from '@app/auth/services/login.service';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';

export function authGuard(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  const router = inject(Router);
  const loginService = inject(LoginService);

  if (!loginService.isLoggedIn) {
    void router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
