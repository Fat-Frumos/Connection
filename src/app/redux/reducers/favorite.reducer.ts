import {createReducer, on} from '@ngrx/store';
import {initialState} from '@app/redux/states/favorite.state';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';

export const favoriteReducer = createReducer(
  initialState,
  on(toggleFavorite, (state, {videoId}) => {
    const isFavorite = state.favoriteVideos.some((favVideo) => favVideo.id.videoId === videoId);
    return {
      ...state,
      favoriteVideos: isFavorite
        ? state.favoriteVideos.filter((favVideo) => favVideo.id.videoId !== videoId)
        : [...state.favoriteVideos]
    };
  })
);
