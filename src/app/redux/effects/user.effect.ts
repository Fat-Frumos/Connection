import {catchError, mergeMap, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFailure} from '@app/redux/actions/user.actions';
import {Injectable} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';

function extractErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Unknown error';
}

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(() => {
        const user = this.authService.user;
        return of(login({user}));
      }),
      catchError((error) => of(loginFailure({error: extractErrorMessage(error)})))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: LoginService) {
    console.log('UserEffects');
  }
}
