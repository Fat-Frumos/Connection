import {createReducer, on} from '@ngrx/store';
import {saveVideos} from '@app/redux/actions/video.actions';
import {initialState} from '@app/redux/states/video-item.state';

export const videoItemReducer =
  createReducer(initialState,
    on(saveVideos, (state, {videos}) => {
      return {...state, videos: videos};
    })
  );
