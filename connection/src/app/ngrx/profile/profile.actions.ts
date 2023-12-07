import {createAction, props} from '@ngrx/store';
import {ErrorMessage} from '@app/model/error-message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export const loadProfile =
  createAction('[Profile] Load Profile');

export const loadProfileSuccess =
  createAction('[Profile] Load Profile Success', props<{
    profile: UserProfileResponse
  }>());

export const loadProfileFailure =
  createAction('[Profile] Load Profile Failure', props<{
    error: ErrorMessage
  }>());

export const updateProfile =
  createAction('[Profile] Update Profile', props<{
    name: string
  }>());

export const updateProfileFailed =
  createAction('[Profile] Update Failed');
