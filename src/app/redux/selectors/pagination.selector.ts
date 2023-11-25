import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CardState} from '@app/redux/state.models';

export const selectPaginationState =
  createFeatureSelector<CardState>('customCard');

export const selectCurrentPage =
  createSelector(selectPaginationState,
    state => state.currentPage);
