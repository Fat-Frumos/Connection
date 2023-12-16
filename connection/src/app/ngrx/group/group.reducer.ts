import {createReducer, on} from '@ngrx/store';
import {GroupState, initialGroupState} from '@app/ngrx/group/group.state';
import {
  loadGroupsFailure,
  loadGroupsSuccess
} from '@app/ngrx/group/group.actions';

export const groupReducer = createReducer(
  initialGroupState,
  on(loadGroupsSuccess, (state, {groups}) =>
    ({...state, groups, error: ''})),
  on(loadGroupsFailure, (state, {error}) =>
    ({...state, groups: [], error}))
);

export const getGroups = (state: GroupState) => state.groups;
export const getGroupError = (state: GroupState) => state.error;
