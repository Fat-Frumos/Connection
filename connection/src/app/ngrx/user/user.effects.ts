import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap} from 'rxjs/operators';
import {UserService} from '@app/auth/service/user.service';
import {
  beginRegister,
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess
} from '@app/ngrx/user/user.actions';
import {of} from 'rxjs';
import {User} from '@app/model/user.model';
import {Router} from '@angular/router';
import {showAlert} from '@app/ngrx/app/app.action';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      mergeMap(() =>
        this.userService.getUser$().pipe(
          map((user: User) => fetchUserSuccess({user})),
          catchError(() => of(fetchUserFailed))
        )
      )
    )
  );

  userRegister = createEffect(() =>
    this.actions$.pipe(
      ofType(beginRegister),
      exhaustMap((action) =>
        this.userService.registration(action.user).pipe(
          map(() => {
            void this.route.navigate(['/signin']);
            return showAlert({
              message: 'Registered successfully',
              resultType: 'pass'
            });
          }),
          catchError((_error: Error) =>
            of(showAlert({
              message: 'Registration failed: ' + _error.message,
              resultType: 'fail'
            }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService, private route: Router) {
    console.log(this.loadUser$);
  }
}
