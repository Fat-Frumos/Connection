import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface PeopleState extends EntityState<UserProfileResponse []> {
  people: UserProfileResponse[];
  error: string;
}

export const peopleAdapter =
  createEntityAdapter<UserProfileResponse[]>();

export const initialPeopleState: PeopleState =
  peopleAdapter.getInitialState({
    people: [],
    error: ''
  });
