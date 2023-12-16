import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProfileState} from './profile.reducer';

export const selectProfileState =
  createFeatureSelector<ProfileState>('profile');

export const selectProfileData =
  createSelector(selectProfileState, (state) => state.profile);

export const selectProfileError =
  createSelector(selectProfileState, (state) => state.error);

export const getProfileState =
  createFeatureSelector<ProfileState>('profile');

export const getProfile =
  createSelector(getProfileState, state => state.profile);

export const getError =
  createSelector(getProfileState, state => state.error);
