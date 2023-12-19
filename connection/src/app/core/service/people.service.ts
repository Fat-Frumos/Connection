import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {baseUrl} from '@app/config';
import {PeopleResponse} from '@app/model/user/user-response.model';
import {
  ConversationResponse
} from '@app/model/conversation/conversation-response.model';
import {MessageResponse} from '@app/model/message/message-response.models';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  http: HttpClient = inject(HttpClient);

  getPeople(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(
      `${baseUrl}/users`);
  }

  getConversationList(): Observable<ConversationResponse> {
    return this.http.get<ConversationResponse>(
      `${baseUrl}/conversations/list`);
  }

  getMessages(conversationID: string, since?: number) {
    let params = new HttpParams().set('conversationID', conversationID);

    if (since) {
      params = params.append('since', since.toString());
    }
    return this.http.get<MessageResponse>(
      `${baseUrl}/conversations/read`, {params});
  }

  sendMessage(id: string, message: string) {
    return this.http.post(
      `${baseUrl}/conversations/append`,
      {conversationID: id, message});
  }

  deleteConversation(id: string) {
    const params = new HttpParams().set('conversationID', id);
    return this.http.delete(`${baseUrl}/conversations/delete`, {params});
  }
}
