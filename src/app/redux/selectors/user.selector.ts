import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, UserState} from '@app/redux/state.models';

export const selectAuthState =
  createFeatureSelector<AuthState>('user');

export const selectUserState =
  createFeatureSelector<UserState>('user');

export const selectIsLoggedIn =
  createSelector(selectAuthState, (state: AuthState) =>
    state.isLoggedIn);

export const selectError =
  createSelector(selectAuthState, (state: AuthState) =>
    state.error);

export const getUserStore =
  createFeatureSelector<UserState>('user');

export const getCurrentUser =
  createSelector(getUserStore, (state: UserState) => state.user);

export const getIsFetched =
  createSelector(getUserStore, (state: UserState) => state.isFetched);
