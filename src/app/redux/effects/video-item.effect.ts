import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, Observable, of, switchMap} from 'rxjs';
import {VideoService} from '@app/youtube/services/video.service';
import {
  fetchResult,
  fetchVideosSuccess,
  fetchVideoSuccess,
  loadVideosFailure
} from '@app/redux/actions/video-item.actions';
import {Action} from '@ngrx/store';

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
      ofType(fetchVideoSuccess),
      switchMap(() => this.videoService.fetchVideoData('').pipe(
        map(videos => fetchVideosSuccess({videos})),
        catchError(() => of(loadVideosFailure))
      ))
    )
  );

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResult),
      mergeMap(
        ({value}): Observable<Action> =>
          this.videoService.fetchVideoData(value).pipe(
            map((videos) => fetchVideosSuccess({videos})),
            catchError(() => of(loadVideosFailure))
          )
      )
    )
  );
}
