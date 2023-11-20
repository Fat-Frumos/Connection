import {createReducer, on} from '@ngrx/store';
import {initialState, videoAdapter} from '@app/redux/states/video-item.state';
import {
  loadVideosSuccess, updateVideosFromService
} from '@app/redux/actions/video-item.actions';


export const videoItemReducer =
  createReducer(initialState,
    on(loadVideosSuccess, (state, {videos}) => {
      return {...state, videos: videos};
    }),
    on(updateVideosFromService, (state, {videoItems}) => {
      return videoAdapter.setAll(videoItems, state);
    }));
