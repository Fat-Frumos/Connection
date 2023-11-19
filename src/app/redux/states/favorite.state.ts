import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export interface FavoriteState {
  favoriteVideos: CustomCard[];
  currentPage: 1
}

export const initialState: FavoriteState = {
  favoriteVideos: [],
  currentPage: 1
};

