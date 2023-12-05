import {createAction, props} from '@ngrx/store';
import {User} from '@app/auth/models/user';

const actionSource = '[User]';

export const fetchUser =
  createAction(`${actionSource} Fetch User`);

export const fetchUserSuccess =
  createAction(`${actionSource} Fetch User`, props<{ user: User }>());

export const fetchUserFailed =
  createAction(`${actionSource} Fetch User failed`);

export const login =
  createAction(`${actionSource} Login`, props<{ user: User }>());

export const logout =
  createAction(`${actionSource} Logout`);

export const loginFailure =
  createAction('[Auth] Login Failure', props<{ error: string }>());
