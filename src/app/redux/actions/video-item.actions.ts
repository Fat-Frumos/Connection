import {createAction, props} from '@ngrx/store';
import {VideoItem} from '@app/youtube/models/video-item-model';

const actionSource = '[Video]';

export const loadVideos =
  createAction(`${actionSource} Load Videos`);

export const fetchResult =
  createAction(`${actionSource} Load Search Result`,
    props<{ value: string }>());

export const fetchVideoSuccess =
  createAction(`${actionSource} Load Video Success`,
    props<{ video: VideoItem }>());

export const fetchVideosSuccess =
  createAction(`${actionSource} Load Videos Success`,
    props<{ videos: VideoItem[] }>());

export const loadVideosFailure =
  createAction(`${actionSource} Load Videos Failure`,
    props<{ error: string }>());

export const addVideo =
  createAction('[Video] Add Video',
    props<{ video: VideoItem }>());

export const updateVideosFromService =
  createAction('[Video] Update Videos From Service',
    props<{ videoItems: VideoItem[] }>());


export const getById =
  createAction('[Video] get By Id Video',
    props<{ id: string }>());

export const deleteVideo =
  createAction('[Video] Delete Video',
    props<{ id: string }>());

export const setCurrentPage =
  createAction('[Video] Set Current Page',
    props<{ currentPage: number }>());
