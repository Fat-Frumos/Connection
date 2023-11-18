import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';
import {VideoService} from '@app/youtube/services/video.service';
import {loadVideos, saveVideos} from '@app/redux/actions/video.actions';
import {VideoItem} from '@app/youtube/models/video-item-model';

@Injectable()
export class VideoEffects {

  loadVideos$ = createEffect(() => this.actions$.pipe(
    ofType(loadVideos),
    mergeMap(() => this.videoService.videos$
      .pipe(
        map((videos: VideoItem[]) => saveVideos({ videos })),
        catchError(() => of({ type: 'LOAD_VIDEOS_ERROR' }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private videoService: VideoService
  ) {
    console.log('Features');
  }
}
