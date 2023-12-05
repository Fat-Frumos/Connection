import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {inject} from '@angular/core';
import {UserService} from '@app/auth/service/user.service';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.isAuthenticated()
    ? of(true) :
    of(router.parseUrl('/signin'));
};
