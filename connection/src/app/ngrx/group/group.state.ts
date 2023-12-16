import {Group} from '@app/model/conversation/group.model';

export interface GroupState {
  groups: Group[];
  error: string;
}

export const initialGroupState: GroupState = {
  groups: [],
  error: ''
};
