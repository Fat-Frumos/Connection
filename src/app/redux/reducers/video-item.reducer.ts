import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VideoState} from '@app/redux/states/video-item.state';

export const getVideoStore =
  createFeatureSelector<VideoState>('video');
export const getCurrentVideo =
  createSelector(getVideoStore, (state: VideoState) => state.video);

export const getIsFetched =
  createSelector(getVideoStore, (state: VideoState) => state.isFetched);
