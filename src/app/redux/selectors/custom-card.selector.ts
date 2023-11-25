import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CardState} from '@app/redux/state.models';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export const selectCustomCardState =
  createFeatureSelector<CardState>('customCard');

export const selectAllCustomCards =
  createSelector(selectCustomCardState,
    (state: CardState) => state.customCards);

export const selectCustomCardsByPage = (page: number, pageSize: number) =>
  createSelector(
    selectAllCustomCards,
    (customCards: CustomCard[]) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return customCards.slice(startIndex, endIndex);
    }
  );
