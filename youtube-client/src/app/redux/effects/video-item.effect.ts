import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, Observable, of, switchMap} from 'rxjs';
import {VideoService} from '@app/youtube/services/video.service';
import {Action} from '@ngrx/store';
import {
  fetchCustomCardsSuccess,
  fetchCustomCardSuccess, fetchResult,
  fetchVideosFailure
} from '@app/redux/actions/custom-card.action';

@Injectable()
export class VideoEffects {

  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {
    console.log('Features');
  }

  fetchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCustomCardSuccess),
      switchMap(() => this.videoService.fetchCustomCards('').pipe(
        map(videos => fetchCustomCardsSuccess({customCards: videos})),
        catchError(() => of(fetchVideosFailure))
      ))
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResult),
      mergeMap(
        ({result}): Observable<Action> =>
          this.videoService.fetchCustomCards(result).pipe(
            map((videos) => fetchCustomCardsSuccess({customCards: videos})),
            catchError(() => of(fetchVideosFailure))
          )
      )
    )
  );
}
