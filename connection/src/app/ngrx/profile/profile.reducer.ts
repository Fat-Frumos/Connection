import {createReducer, on} from '@ngrx/store';
import {
  loadProfileFailure,
  loadProfileSuccess, updateProfileFailure,
  updateProfileSuccess
} from './profile.actions';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {People} from '@app/model/user/user-profile-response.model';

export interface ProfileState {
  name: string;
  profile: People;
  error: ErrorMessage;
}

export const initialProfileState: ProfileState = {
  name: '',
  profile: {} as People,
  error: {} as ErrorMessage
};

export const profileReducer = createReducer(
  initialProfileState,
  on(loadProfileSuccess, (state, {profile}) =>
    ({...state, profile, error: {} as ErrorMessage})),
  on(loadProfileFailure, (state, {error}) =>
    ({...state, profile: {} as People, error})),
  on(updateProfileSuccess, (state, { updatedProfile }) =>
    ({ ...state, profile: updatedProfile })),
  on(updateProfileFailure, (state, { error }) =>
    ({ ...state, error }))
);

export const getProfile = (state: ProfileState) => state.profile;
export const getError = (state: ProfileState) => state.error;
