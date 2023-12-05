import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from './profile.reducer';

export const selectProfileState =
  createFeatureSelector<ProfileState>('profile');

export const selectProfileData =
  createSelector(selectProfileState, (state) => state.profile);

export const selectProfileError =
  createSelector(selectProfileState, (state) => state.error);
