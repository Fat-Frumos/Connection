import {createAction, props} from '@ngrx/store';
import {Group} from '@app/model/conversation/group.model';

const groupLoad = '[Groups] Load Groups';

export const loadGroups = createAction(groupLoad);
export const loadGroupsSuccess =
  createAction(`${groupLoad} Success`, props<{ groups: Group[] }>());
export const loadGroupsFailure =
  createAction(`${groupLoad} Failure`, props<{ error: string }>());
