import {createAction, props} from '@ngrx/store';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

const profileLoad = '[Profile] Load Profile';
const profileUpdate = '[Profile] Update Profile';

export const loadProfile =
  createAction(profileLoad);

export const loadProfileSuccess =
  createAction(`${profileLoad} Success`,
    props<{ profile: UserProfileResponse }>());

export const loadProfileFailure =
  createAction(`${profileLoad} Failure`,
    props<{ error: ErrorMessage }>());

export const updateProfile =
  createAction(`${profileUpdate}`,
    props<{ profile: UserProfileResponse }>());

export const updateProfileSuccess =
  createAction(`${profileUpdate} Success`,
    props<{ updatedProfile: UserProfileResponse }>());

export const updateProfileFailure =
  createAction(`${profileUpdate} Failed`,
    props<{ error: ErrorMessage }>());
