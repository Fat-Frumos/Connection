import {inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
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
    this.conversations.set(companion, { messages: [], participants: [] });
    return this.http.post<Conversation>(`${baseUrl}/conversations/create`, { companion });
  }

  sendMessage(uid: string, newMessage: string): Observable<string> {
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
    return of(newMessage);
  }

  checkConversation(id: string) {
    return this.conversations.has(id);
  }
}
