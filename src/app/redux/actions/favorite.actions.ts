import {createAction, props} from '@ngrx/store';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export const addFavorite = createAction(
  '[Video] Add Favorite',
  props<{ video: CustomCard }>()
);

export const removeFavorite = createAction(
  '[Video] Remove Favorite',
  props<{ videoId: string }>()
);

export const toggleFavorite =
  createAction('[Favorite] Toggle Favorite',
    props<{ videoId: string }>());
