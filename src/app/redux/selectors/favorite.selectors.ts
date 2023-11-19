import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FavoriteState} from '@app/redux/states/favorite.state';

export const selectFavoriteState =
  createFeatureSelector<FavoriteState>('favorite');

export const selectFavoriteVideos =
  createSelector(selectFavoriteState, (state) =>
    state.favoriteVideos);

export const selectIsFavorite = (videoId: string) =>
  createSelector(
    selectFavoriteVideos,
    (favoriteVideos) =>
      favoriteVideos.some(video => video.id === videoId));
