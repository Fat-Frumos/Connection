import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {CardState} from '@app/redux/state.models';

export const customCardAdapter: EntityAdapter<CustomCard> =
  createEntityAdapter<CustomCard>();

export const initialState: CardState =
  customCardAdapter.getInitialState({
    customCards: [],
    videos: [],
    currentPage: 1
  });
