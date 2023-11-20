import {User} from '@app/auth/models/user';
import {createReducer, on} from '@ngrx/store';
import {
  fetchUserFailed,
  fetchUserSuccess,
  login,
  logout
} from '@app/redux/actions/user.actions';
import {UserState} from '@app/redux/state.models';

export const initialState: UserState = {
  user: null,
  isFetched: false
};

export const reducer =
  createReducer(initialState,
    on(fetchUserSuccess, (state, {user}) => ({
      ...state,
      user,
      isFetched: true
    })),
    on(fetchUserFailed, state => ({
      ...state,
      isFetched: true
    }))
  );

export const userReducer =
  createReducer(initialState,
    on(login, (state, {user}) =>
      ({...state, user, isLoggedIn: true})),
    on(logout, (state) =>
      ({...state, user: {} as User, isLoggedIn: false})));
