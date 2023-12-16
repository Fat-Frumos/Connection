import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, mergeMap, of} from 'rxjs';
import {
  loadProfile,
  loadProfileSuccess,
  updateProfile,
  updateProfileFailure
} from './profile.actions';
import {UserService} from '@app/auth/service/user.service';
import {ErrorMessage} from '@app/model/message/error-message.model';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(loadProfile),
    mergeMap(() => this.service.fetchUser()
      .pipe(
        map(profile => loadProfileSuccess({profile})),
        catchError(() => EMPTY)
      )
    )
  ));

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      mergeMap(({profile}) =>
        this.service.update(profile.name.S).pipe(
          map(() => updateProfile),
          catchError((error: ErrorMessage) =>
            of(updateProfileFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: UserService) {
    console.log(this.updateProfile$);
  }
}
