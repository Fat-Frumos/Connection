import {createAction, props} from '@ngrx/store';
import {VideoItem} from '@app/youtube/models/video-item-model';

const actionSource = '[Video]';

export const loadVideos =
  createAction(`${actionSource} Load Videos`);

export const addVideo =
  createAction('[Video] Add Video',
    props<{ video: VideoItem }>());
