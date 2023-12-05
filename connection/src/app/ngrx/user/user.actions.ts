import {createAction, props} from '@ngrx/store';
import {User} from '@app/model/user.model';

export const registerUser = createAction(
  '[User] Register User',
  props<{ user: User }>()
);

export const registerUserSuccess = createAction(
  '[User] Register User Success',
  props<{ message: string }>()
);

export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{ error: string }>()
);

export const fetchUser =
  createAction('[User] Load User');

export const fetchUserSuccess =
  createAction('[User] Load User Success',
    props<{
      user: User
    }>());

export const fetchUserFailed =
  createAction('[User] Load User Failed');

export const beginRegister =
  createAction('[Auth] begin Register', props<{
    user: User
  }>());

export const beginLogin =
  createAction('[Auth] begin Login', props<{
    authUser: User
  }>());

export const duplicateUser =
  createAction('[Auth] duplicate user', props<{
    username: string;
  }>());

export const duplicateUserSuccess =
  createAction('[Auth] duplicate user ', props<{
    isDuplicate: boolean;
  }>());

export const getUsersSuccess =
  createAction('[User] Load User Success', props<{
    userList: User[]
  }>());
