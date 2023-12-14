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

  private conversations: Map<string, Conversation> = new Map();

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${baseUrl}/users`);
  }

  getConversations$(): Observable<ConversationResponse> {
    return this.http.get<ConversationResponse>(`${baseUrl}/conversations/list`);
  }

  createConversation(companion: string): Observable<Conversation> {
    this.conversations.set(companion, {
      conversationID: companion,
      messages: [],
      participants: []
    });
    return this.http.post<Conversation>(`${baseUrl}/conversations/create`, {companion});
  }

  sendMessage(uid: string, newMessage: string): Observable<string> {
    const url = `${baseUrl}/append`;
    const body = {uid, newMessage};
    const conversation = this.conversations.get(uid);

    if (conversation) {
      conversation.messages.push({
        recipient: uid,
        authorID: '',
        message: newMessage,
        createdAt: new Date().toISOString(),
        sender: '',
        lastMessage: newMessage
      });
    } else {
      this.createConversation(uid);
    }
    return this.http.post<string>(url, body);
  }

  checkConversation(id: string) {
    return this.conversations.has(id);
  }

  getConversationMessages(conversationID: string, since?: number): Observable<ConversationResponse> {
    const url = `${baseUrl}/read?conversationID=${conversationID}${since ? `&since=${since}` : ''}`;
    return this.http.get<ConversationResponse>(url);
  }

  deleteConversation(conversationID: string): Observable<void> {
    const url = `${baseUrl}/delete?conversationID=${conversationID}`;
    return this.http.delete<void>(url);
  }
}
