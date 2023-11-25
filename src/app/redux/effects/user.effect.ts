import {catchError, map, of, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess
} from '@app/redux/actions/user.actions';
import {Injectable} from '@angular/core';
import {LoginService} from '@app/auth/services/login.service';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      switchMap(() =>
        this.authService.fetchUser().pipe(
          map(user => fetchUserSuccess({user})),
          catchError(() => of(fetchUserFailed()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: LoginService) {
    console.log('UserEffects');
  }
}
