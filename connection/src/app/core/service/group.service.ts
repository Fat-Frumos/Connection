import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '@app/model/conversation/group.model';
import {GroupResponse} from '@app/model/conversation/group-response.model';
import {baseUrl} from '@app/config';
import {MessageResponse} from '@app/model/message/message-response.models';
import {
  Conversation,
  ConversationId
} from '@app/model/conversation/conversation.models';
import {PeopleResponse} from '@app/model/user/user-response.model';
import {
  ConversationResponse
} from '@app/model/conversation/conversation-response.model';
import {map} from 'rxjs/operators';

@Injectable()
export class GroupService {

  since = 0;

  messages = [];

  http: HttpClient = inject(HttpClient);

  private _conversations: Map<string, Conversation> = this.loadConversations();

  currentConversationId = '';

  get conversations(): Map<string, Conversation> {
    return this._conversations;
  }

  set conversations(value: Map<string, Conversation>) {
    this._conversations = value;
  }

  getGroups(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(
      `${baseUrl}/groups/list`);
  }

  createGroup(groupName: string): Observable<Group> {
    return this.http.post<Group>(
      `${baseUrl}/groups/create`, {groupName});
  }

  deleteGroup(groupId: string): Observable<void> {
    const params = new HttpParams().set('groupID', groupId);
    return this.http.delete<void>(
      `${baseUrl}/groups/delete`, {params});
  }

  getMessages(groupId: string, since?: number) {
    const params = new HttpParams().set('groupID', groupId);
    if (since) {
      params.append('since', since.toString());
    }
    return this.http.get<MessageResponse>(
      `${baseUrl}/groups/read`, {params});
  }

  getPeople$(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(`${baseUrl}/users`);
  }

  getConversations$(): Observable<ConversationResponse> {
    return this.http.get<ConversationResponse>(
      `${baseUrl}/conversations/list`);
  }

  createConversation(companion: string): Observable<ConversationId> {
    this.since = this.since ? +this.since + 1 : new Date().getTime();
    return this.http.post<ConversationId>(
      `${baseUrl}/conversations/create`, {
        companion: companion,
        since: this.since
      });
  }

  loadConversations(): Map<string, Conversation> {
    const conversationsMap = new Map<string, Conversation>();
    this.getConversations$().pipe(
      map((response: ConversationResponse) => {
        response.Items.forEach((conversation: Conversation) => {
          conversationsMap.set(conversation.id.S, conversation);
        });
      })
    );
    return conversationsMap;
  }

  getConversationMessages(conversationID: string, since?: number): Observable<MessageResponse> {
    const queryParams = since
      ? `?conversationID=${conversationID}&since=${since}`
      : `?conversationID=${conversationID}`;
    return this.http.get<MessageResponse>(`${baseUrl}/conversations/read${queryParams}`);
  }

  sendNewMessage(conversationID: string, message: string): Observable<string> {
    return this.http.post<string>(`${baseUrl}/conversations/append`, {
      conversationID, message
    });
  }

  deleteConversation(conversationID: string): Observable<string> {
    return this.http.delete<string>(
      `${baseUrl}/conversations/delete?conversationID=${conversationID}`);
  }
}
