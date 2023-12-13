import {Group} from '@app/model/conversation/group.model';
import {Message} from '@app/model/conversation/message.model';
import {UserModel} from '@app/ngrx/user/user.state';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface AppState {
  people: UserProfileResponse [];
  messages: Message[];
  groups: Group[];
  user: UserModel;
}
