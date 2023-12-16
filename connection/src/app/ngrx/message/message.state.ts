import {Message} from '@app/model/message/message.model';

export interface MessageState {
  messages: Message[];
  error: string;
}

export const initialMessageState: MessageState = {
  messages: [],
  error: ''
};
