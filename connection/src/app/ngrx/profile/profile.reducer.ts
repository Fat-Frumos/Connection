import {createReducer, on} from '@ngrx/store';
import {
  loadProfileFailure,
  loadProfileSuccess,
  updateProfile
} from './profile.actions';
import {ErrorMessage} from '@app/model/error-message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface ProfileState {
  name: string;
  profile: UserProfileResponse;
  error: ErrorMessage;
}

export const initialState: ProfileState = {
  name: '',
  profile: {} as UserProfileResponse,
  error: {} as ErrorMessage
};

export const loadProfileReducer = createReducer(
  initialState,
  on(loadProfileSuccess, (state, {profile}) =>
    ({...state, profile, error: {} as ErrorMessage})),
  on(loadProfileFailure, (state, {error}) =>
    ({...state, profile: {} as UserProfileResponse, error}))
);

export const updateProfileReducer = createReducer(
  initialState,
  on(updateProfile, (state, {profile}) =>
    ({...state, profile}))
);
