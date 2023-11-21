import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on
} from '@ngrx/store';
import {initialState, VideoState} from '@app/redux/states/video-item.state';
import {
  fetchVideoSuccess,
  loadVideosFailure
} from '@app/redux/actions/video-item.actions';

export const videoItemReducer =
  createReducer(initialState,
    on(fetchVideoSuccess, (state, {video}) => ({
      ...state,
      video,
      isFetched: true
    })),
    on(loadVideosFailure, (state) => ({
      ...state,
      isFetched: true
    })));

export const getVideoStore =
  createFeatureSelector<VideoState>('video');
export const getCurrentVideo =
  createSelector(getVideoStore, (state: VideoState) => state.video);

export const getIsFetched =
  createSelector(getVideoStore, (state: VideoState) => state.isFetched);
