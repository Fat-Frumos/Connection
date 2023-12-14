import {Message} from '@app/model/message/message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface SelectedConversation {
  messages: Message[];
  participants: UserProfileResponse[];
}
