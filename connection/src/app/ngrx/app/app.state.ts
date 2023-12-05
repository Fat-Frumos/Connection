import {Group} from '@app/model/group.model';
import {Message} from '@app/model/message.model';
import {UserModel} from '@app/ngrx/user/user.state';

export interface AppState {
  user: UserModel;
  groups: Group[];
  messages: Message[];
}
