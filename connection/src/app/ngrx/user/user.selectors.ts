import {createFeatureSelector} from '@ngrx/store';
import {User} from '@app/model/user.model';
import {UserModel} from '@app/ngrx/user/user.state';

export const selectUserState =
  createFeatureSelector<UserModel>('user');

export const selectUser =
  createFeatureSelector<User>('user');
