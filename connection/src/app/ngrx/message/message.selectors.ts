import {MessageState} from '@app/ngrx/message/message.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getMessageError, getMessages} from '@app/ngrx/message/message.reducer';

export const selectMessagesState
  = createFeatureSelector<MessageState>('messages');

export const selectMessages =
  createSelector([selectMessagesState], getMessages);

export const selectMessageError =
  createSelector([selectMessagesState], getMessageError);
