import {createFeatureSelector} from '@ngrx/store';
import {AuthUser} from '@app/model/user/user-registration.model';
import {UserModel} from '@app/ngrx/user/user.state';

export const selectUserState =
  createFeatureSelector<UserModel>('user');

export const selectUser =
  createFeatureSelector<AuthUser>('user');
