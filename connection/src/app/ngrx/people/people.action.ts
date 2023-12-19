import {createAction, props} from '@ngrx/store';
import {People} from '@app/model/user/user-profile-response.model';
import {ConversationId} from '@app/model/conversation/conversation.models';

export const loadPeople =
  createAction('[People] Load');

export const loadPeopleSuccess =
  createAction('[People] Load Success', props<{ people: People[] }>());

export const loadPeopleFailure =
  createAction('[People] Load Failure', props<{ error: string }>());

export const loadConversationMessage =
  createAction('[People] Load conversation message',
    props<{ conversationID: string; since?: number }>());

export const deleteConversation =
  createAction('[People] Delete conversation', props<ConversationId>());

export const sendConversationMessage =
  createAction('[People] send conversation message',
    props<{ conversationID: string; message: string; since: number | null }>());

export const updateConversationMessage =
  createAction('[People] update conversation message',
    props<{ conversationID: string; since?: number }>());
