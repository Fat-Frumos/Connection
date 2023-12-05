import {createReducer, on} from '@ngrx/store';
import {
  loadProfileFailure,
  loadProfileSuccess,
  updateProfile
} from './profile.actions';
import {ErrorMessage} from '@app/model/error-message.model';
import {ProfileResponse} from '@app/model/profile-response.model';

export interface ProfileState {
  name: string;
  profile: ProfileResponse | null;
  error: ErrorMessage | null;
}

export const initialState: ProfileState = {
  name: '',
  profile: null,
  error: null
};

export const loadProfileReducer = createReducer(
  initialState,
  on(loadProfileSuccess, (state, {profile}) =>
    ({...state, profile, error: null})),
  on(loadProfileFailure, (state, {error}) =>
    ({...state, profile: null, error}))
);

export const updateProfileReducer = createReducer(
  initialState,
  on(updateProfile, (state, {name}) =>
    ({...state, name}))
);
