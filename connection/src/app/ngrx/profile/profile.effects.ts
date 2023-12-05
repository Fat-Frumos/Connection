import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, mergeMap, of} from 'rxjs';
import {
  loadProfile,
  loadProfileSuccess,
  updateProfile,
  updateProfileFailed
} from './profile.actions';
import {ProfileService} from '@app/core/service/profile.service';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(loadProfile),
    mergeMap(() => this.profileService.profileData$
      .pipe(
        map(profile => loadProfileSuccess({profile})),
        catchError(() => EMPTY)
      )
    )
  ));

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      mergeMap(({name}) =>
        this.profileService.updateProfile(name).pipe(
          map(() => updateProfile),
          catchError(() => of(updateProfileFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private profileService: ProfileService) {
    console.log();
  }
}
