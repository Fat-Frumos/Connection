import {createAction, props} from '@ngrx/store';
import {VideoItem} from '@app/youtube/models/video-item-model';

export const loadVideos =
  createAction('[Video] Load Videos');

export const loadVideosSuccess =
  createAction('[Video] Load Videos Success',
    props<{ videos: VideoItem[] }>());

export const loadVideosFailure =
  createAction('[Video] Load Videos Failure',
    props<{ error: string }>());

export const addVideo =
  createAction('[Video] Add Video',
    props<{ video: VideoItem }>());

export const saveVideos =
  createAction('[Video] Save Videos',
    props<{ videos: VideoItem[] }>());

export const deleteVideo =
  createAction('[Video] Delete Video',
    props<{ id: string }>());

export const setCurrentPage =
  createAction('[Video] Set Current Page',
    props<{ currentPage: number }>());
