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
