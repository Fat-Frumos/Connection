import {Message} from '@app/model/conversation/message.model';
import {UserProfileResponse} from '@app/model/user/user-profile-response.model';

export interface Conversation {
  messages: Message[];
  participants: UserProfileResponse[];
}
