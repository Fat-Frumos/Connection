import {createFeatureSelector} from '@ngrx/store';
import {PeopleState} from '@app/ngrx/people/people.state';
import {
  PeopleConversationState
} from '@app/model/message/message-response.models';

export const selectPeopleState =
  createFeatureSelector<PeopleState>('people');

export const selectPeopleConversationState =
  createFeatureSelector<PeopleConversationState>('peopleConversation');

