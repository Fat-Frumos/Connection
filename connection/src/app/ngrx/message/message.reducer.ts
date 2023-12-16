import {createReducer, on} from '@ngrx/store';
import {
  initialMessageState,
  MessageState
} from '@app/ngrx/message/message.state';
import {
  loadMessagesFailure,
  loadMessagesSuccess, updateMessageFailure, updateMessageSuccess
} from '@app/ngrx/message/message.actions';

export const messageReducer = createReducer(
  initialMessageState,
  on(loadMessagesSuccess, (state, {messages}) => ({
    ...state,
    messages,
    error: ''
  })),
  on(loadMessagesFailure, (state, {error}) => ({
    ...state,
    messages: [],
    error
  })),
  on(updateMessageSuccess, (state, {message}) => {
    const updatedMessages = state.messages.map((m) =>
      m.authorID === message.authorID ? message : m);
    return {...state, messages: updatedMessages, error: '' as string};
  }),
  on(updateMessageFailure, (state, {error}) => ({...state, error}))
);

export const getMessages = (state: MessageState) => state.messages;
export const getMessageError = (state: MessageState) => state.error;
