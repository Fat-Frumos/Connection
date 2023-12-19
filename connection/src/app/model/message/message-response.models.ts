import {Message} from '@app/model/message/message.model';
import {Conversation} from '@app/model/conversation/conversation.models';
import {ErrorMessage} from '@app/model/message/error-message.model';

export interface MessageResponse {
  Count: number;
  Items: Message[];
}

export interface AuthData {
  uid: string;
}

export interface Groups {
  [key: string]: string[];
}

export interface StorageAuth {
  token: string;
  uid: string;
  email: string;
}

export interface PeopleConversationState {
  peopleConversationList: Conversation[];

  peopleConversationMessageItems: {
    [conversationID: string]: {
      peopleConversationMessageItem: Message[] | null;
      error: ErrorMessage | null;
      since: number | null;
    };
  } | null;

  loading: boolean;
}

export interface PeopleConversationSendMessage {
  conversationID: string;
  message: string;
  since: number;
}
