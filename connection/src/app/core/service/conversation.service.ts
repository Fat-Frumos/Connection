import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserResponse} from '@app/model/user/user-response.model';
import {baseUrl} from '@app/config';
import {
  ConversationResponse
} from '@app/model/conversation/conversation-response.model';
import {Conversation} from '@app/model/conversation/conversation.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  http: HttpClient = inject(HttpClient);

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${baseUrl}/users`);
  }

  getConversations(): Observable<ConversationResponse> {
    return this.http.get<ConversationResponse>(`${baseUrl}/conversations/list`);
  }

  createConversation(companion: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${baseUrl}/conversations/create`, {companion});
  }
}
