import {createAction, props} from '@ngrx/store';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export const loadPeople = createAction('[People] Load');
export const loadPeopleSuccess =
  createAction('[People] Load Success', props<{ people: UserProfileResponse[] }>());
export const loadPeopleFailure =
  createAction('[People] Load Failure', props<{ error: string }>());
