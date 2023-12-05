import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap} from 'rxjs/operators';
import {UserService} from '@app/auth/service/user.service';
import {
  beginRegister,
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess, registerUser, registerUserFailure, registerUserSuccess
} from '@app/ngrx/user/user.actions';
import {of, tap} from 'rxjs';
import {User} from '@app/model/user.model';
import {Router} from '@angular/router';
import {showAlert} from '@app/ngrx/app/app.action';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((action) =>
        this.userService.registration(action.user).pipe(
          map(() => registerUserSuccess({message: 'User registered successfully'})),
          tap(() => this.showSnackBar('User registered successfully')),
          tap(() => this.router.navigate(['/signin'])),
          catchError((error) => {
            this.showSnackBar('Registration failed');
            return of(registerUserFailure({error: 'Registration failed'}));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    console.log();
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

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

  // userRegisterEffect = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(beginRegister),
  //     exhaustMap((action) =>
  //       this.userService.registration(action.user).pipe(
  //         map(() => {
  //           void this.route.navigate(['/signin']);
  //           return showAlert({
  //             message: 'Registered successfully',
  //             resultType: 'pass'
  //           });
  //         }),
  //         catchError((error: Error) =>
  //           of(showAlert({
  //             message: 'Registration failed: ' + error.message,
  //             resultType: 'fail'
  //           }))
  //         )
  //       )
  //     )
  //   )
  // );

  // constructor(private actions$: Actions, private userService: UserService, private route: Router) {
  //   console.log(this.loadUser$);
  // }
}
