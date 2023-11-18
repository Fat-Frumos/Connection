import {createEntityAdapter} from '@ngrx/entity';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {CardState} from '@app/redux/state.models';


export const customCardAdapter =
  createEntityAdapter<CustomCard>();

export const initialState: CardState =
  customCardAdapter.getInitialState({
    favoriteVideos: [],
    currentPage: 1
  });

export const {
  selectAll: selectAllCustomCards,
  selectEntities: selectCustomCardEntities,
  selectIds: selectCustomCardIds,
  selectTotal: selectCustomCardTotal
} = customCardAdapter.getSelectors();
