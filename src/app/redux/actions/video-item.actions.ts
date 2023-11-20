import {createAction, props} from '@ngrx/store';
import {VideoItem} from '@app/youtube/models/video-item-model';

const actionSource = '[Video]';

export const loadVideos =
  createAction(`${actionSource} Load Videos`);

export const loadVideosSuccess =
  createAction(`${actionSource} Load Videos Success`,
    props<{ videos: VideoItem[] }>());

export const loadVideosFailure =
  createAction(`${actionSource} Load Videos Failure`,
    props<{ error: string }>());

export const addVideo =
  createAction('[Video] Add Video',
    props<{ video: VideoItem }>());

export const saveVideos =
  createAction('[Video] Save Videos',
    props<{ videos: VideoItem[] }>());

export const updateVideosFromService =
  createAction('[Video] Update Videos From Service',
    props<{ videoItems: VideoItem[] }>());

export const deleteVideo =
  createAction('[Video] Delete Video',
    props<{ id: string }>());

export const setCurrentPage =
  createAction('[Video] Set Current Page',
    props<{ currentPage: number }>());
