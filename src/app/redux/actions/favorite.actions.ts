import {createAction, props} from '@ngrx/store';

export const addFavorite =
  createAction('[Favorite] Add Favorite',
    props<{ videoId: string }>());

export const removeFavorite =
  createAction('[Favorite] Remove Favorite',
    props<{ videoId: string }>());

export const toggleFavorite =
  createAction('[Favorite] Toggle Favorite',
    props<{ videoId: string }>());
