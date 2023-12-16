import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GroupState} from '@app/ngrx/group/group.state';

export const selectGroupsState =
  createFeatureSelector<GroupState>('groups');

export const selectGroups =
  createSelector(selectGroupsState, (state: GroupState) => state.groups);

export const selectGroupError =
  createSelector(selectGroupsState, (state: GroupState) => state.error);
