import {createReducer, on} from '@ngrx/store';
import {initialPeopleState, peopleAdapter} from '@app/ngrx/people/people.state';
import {
  loadPeopleFailure,
  loadPeopleSuccess
} from '@app/ngrx/people/people.action';

export const peopleReducer = createReducer(
  initialPeopleState,
  on(loadPeopleSuccess, (state, { people }) => {
    return peopleAdapter.setAll([people], { ...state, error: '' });
  }),
  on(loadPeopleFailure, (state, { error }) => {
    return { ...state, error };
  })
);
