import {createAction, props} from '@ngrx/store';
import {AuthUser} from '@app/model/user/user-registration.model';
import {UserLoginResponse} from '@app/model/user/user-login-response.model';

export const loginSuccess =
  createAction('[Auth] Login Success',
    props<{ user: UserLoginResponse }>());

export const loginFailure =
  createAction('[Auth] Login Failure',
    props<{ error: string }>());

export const loginUser =
  createAction('[Auth] begin Login',
    props<{ authUser: AuthUser }>());

export const registerUser =
  createAction(
    '[AuthUser] Register User',
    props<{ user: AuthUser }>()
  );

export const registerUserSuccess =
  createAction(
    '[AuthUser] Register User Success',
    props<{ message: string }>()
  );

export const registerUserFailure =
  createAction(
    '[AuthUser] Register User Failure',
    props<{ error: string }>()
  );

export const fetchUser =
  createAction('[AuthUser] Load User');

export const fetchUserSuccess =
  createAction('[AuthUser] Load User Success',
    props<{ user: AuthUser }>());

export const fetchUserFailed =
  createAction('[User] Load User Failed',
    props<{ error: string }>());

export const duplicateUser =
  createAction('[Auth] duplicate user',
    props<{ username: string; }>());

export const duplicateUserSuccess =
  createAction('[Auth] duplicate user ',
    props<{ isDuplicate: boolean; }>());

export const getUsersSuccess =
  createAction('[User] Load User Success',
    props<{ userList: AuthUser[] }>());
