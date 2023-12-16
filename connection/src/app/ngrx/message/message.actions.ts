import {createAction, props} from '@ngrx/store';
import {Message} from '@app/model/message/message.model';

const messageLoad = '[Messages] Load Messages';

const messageUpdate = '[Messages] Update Message';
export const loadMessages =
  createAction(messageLoad);

export const loadMessagesSuccess =
  createAction(`${messageLoad} Success`,
    props<{ messages: Message[] }>());

export const loadMessagesFailure =
  createAction(`${messageLoad} Failure`,
    props<{ error: string }>());

export const updateMessage =
  createAction(messageUpdate, props<{ message: Message }>());

export const updateMessageSuccess =
  createAction(`${messageUpdate} Success`, props<{ message: Message }>());

export const updateMessageFailure =
  createAction(`${messageUpdate} Failure`, props<{ error: string }>());
