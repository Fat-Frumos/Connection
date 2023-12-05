import {createAction, props} from '@ngrx/store';

const actionSource = '[Favorite]';

export const toggleFavorite = createAction(
  `${actionSource} Toggle Favorite`,
  props<{ videoId: string }>()
);
