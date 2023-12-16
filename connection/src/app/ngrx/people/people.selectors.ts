import {createFeatureSelector, createSelector} from '@ngrx/store';
import {peopleAdapter, PeopleState} from '@app/ngrx/people/people.state';

export const selectPeopleState =
  createFeatureSelector<PeopleState>('people');

export const selectAllPeople =
  createSelector(selectPeopleState, peopleAdapter.getSelectors().selectAll);

export const selectPeopleError =
  createSelector(selectPeopleState, (state) => state.error);
