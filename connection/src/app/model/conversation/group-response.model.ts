import {Group} from '@app/model/conversation/group.model';

export interface GroupResponse {
  Count: number;
  Items: Group[];
}
