import {createReducer, on} from '@ngrx/store';
import {initialState} from '@app/redux/states/favorite.state';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {
  mapperVideoItemToCard,
  selectVideoById
} from '@app/redux/selectors/custom-card.selector';

export const favoriteReducer = createReducer(
  initialState,
  on(toggleFavorite, (state, {videoId}) => {
    const favoriteVideos: CustomCard[] = [...state.favoriteVideos];
    const video = selectVideoById(videoId)(state);
    if (video) {
      const index = favoriteVideos.findIndex(favVideo => favVideo.id === videoId);
      if (index === -1) {
        favoriteVideos.push(mapperVideoItemToCard(video));
      } else {
        favoriteVideos.splice(index, 1);
      }
      return {...state, favoriteVideos};
    }
    return state;
  })
);
