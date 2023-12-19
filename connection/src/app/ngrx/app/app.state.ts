import {UserState} from '@app/ngrx/user/user.state';
import {ProfileState} from '@app/ngrx/profile/profile.reducer';
import {MessageState} from '@app/ngrx/message/message.state';
import {GroupState} from '@app/ngrx/group/group.state';
import {
  PeopleConversationState
} from '@app/model/message/message-response.models';
import {PeopleState} from '@app/ngrx/people/people.state';

export interface AppState {
  people: PeopleState;
  profile: ProfileState;
  messages: MessageState;
  groups: GroupState;
  user: UserState;
}
