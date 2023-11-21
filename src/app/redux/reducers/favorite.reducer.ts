import {createReducer, on} from '@ngrx/store';
import {initialState} from '@app/redux/states/favorite.state';
import {addFavorite, removeFavorite} from '@app/redux/actions/favorite.actions';

export const favoriteReducer = createReducer(
  initialState,
  on(addFavorite, (state, {video}) =>
    ({...state, favoriteVideos: [...state.favoriteVideos, video]})),
  on(removeFavorite, (state, {videoId}) =>
    ({...state, favoriteVideos: state.favoriteVideos
      .filter(video => video.id.videoId !== videoId)}))
);
