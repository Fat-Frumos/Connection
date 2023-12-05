import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VideoState} from '@app/redux/states/video-item.state';

export const selectVideoState =
  createFeatureSelector<VideoState>('video');

export const selectAllVideos =
  createSelector(selectVideoState, (state: VideoState) => state.video);
