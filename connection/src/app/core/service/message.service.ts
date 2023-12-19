import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '@app/model/message/message.model';
import {baseUrl} from '@app/config';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class MessageService {

  http: HttpClient = inject(HttpClient);

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${baseUrl}/conversations/list`);
  }

  updateMessage(message: Message): Observable<Message> {
    const url = `${baseUrl}/append`;
    return this.http.post<Message>(url, message);
  }

  getMessage(groupID: string, since: string): Observable<Message[]> {
    let params = new HttpParams().set('groupID', groupID);
    if (since) {
      params = params.set('since', since);
    }
    return this.http.get<Message[]>(`${baseUrl}/groups/read`, { params });
  }

}
