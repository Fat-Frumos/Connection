import {createFeatureSelector} from '@ngrx/store';
import {AuthUser} from '@app/model/user/user-registration.model';
import {UserState} from '@app/ngrx/user/user.state';

export const selectUserState =
  createFeatureSelector<UserState>('user');

export const selectUser =
  createFeatureSelector<AuthUser>('user');
