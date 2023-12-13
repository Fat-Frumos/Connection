import {Conversation} from '@app/model/conversation/conversation.model';

export interface ConversationResponse {
  Count: number;
  Items: Conversation[];
}
