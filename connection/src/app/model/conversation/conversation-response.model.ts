import {Conversation} from '@app/model/conversation/conversation.models';

export interface ConversationResponse {
  Count: number;
  Items: Conversation[];
}
