import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {LoginService} from '@app/auth/services/login.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService: LoginService = new LoginService();
  const router: Router = new Router();
  if (!authService.isLoggedIn()) {
    return router.parseUrl('/login');
  }
  return true;
};
