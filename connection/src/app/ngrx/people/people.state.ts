import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {People} from '@app/model/user/user-profile-response.model';

export interface PeopleState extends EntityState<People []> {
  people: People[];
  error: string;
}

export const peopleAdapter =
  createEntityAdapter<People[]>();

export const initialPeopleState: PeopleState =
  peopleAdapter.getInitialState({
    people: [],
    error: ''
  });
