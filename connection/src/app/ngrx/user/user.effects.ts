import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserService} from '@app/auth/service/user.service';
import {
  loginFailure,
  loginSuccess,
  loginUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from '@app/ngrx/user/user.actions';
import {EMPTY, of} from 'rxjs';
import {ErrorMessage} from '@app/model/error-message.model';
import {Store} from '@ngrx/store';

@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((action) =>
        this.userService.registration(action.user).pipe(
          map(() => registerUserSuccess({message: 'User registered successfully'})),
          catchError((error: ErrorMessage) => {
            this.store.dispatch(registerUserFailure({error: `Registration failed ${error.message}`}));
            if (error.error.type === 'PrimaryDuplicationException') {
              this.store.dispatch(registerUserFailure({error: 'Email is already taken'}));
            } else {
              this.store.dispatch(registerUserFailure({error: `Registration failed ${error.message}`}));
            }
            return EMPTY;
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) =>
        this.userService.login(action.authUser).pipe(
          map((user) => loginSuccess({ user })),
          catchError(() => of(loginFailure({ error: 'Login failed' })))
        )
      )
    )
  );

  // loadUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fetchUser),
  //     mergeMap(() =>
  //       this.userService.getAuthUser$().pipe(
  //         map((user: AuthUser) => fetchUserSuccess({user})),
  //         catchError((error: ErrorMessage) => {
  //           return of(fetchUserFailed({error: `Registration failed ${error.message}`}));
  //         })
  //       )
  //     )
  //   )
  // );

  constructor(
    private store: Store,
    private actions$: Actions,
    private userService: UserService
  ) {
    console.log(this.login$);
  }
}
