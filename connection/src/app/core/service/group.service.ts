import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '@app/model/conversation/group.model';
import {GroupCreate} from '@app/model/conversation/group-create.model';
import {GroupResponse} from '@app/model/conversation/group-response.model';
import {baseUrl} from '@app/config';
import {Message} from '@app/model/message/message.model';

@Injectable()
export class GroupService {

  http: HttpClient = inject(HttpClient);

  getGroups(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${baseUrl}/groups/list`);
  }

  getMessages(groupID: string, since: string): Observable<Message[]> {
    let params = new HttpParams().set('groupID', groupID);
    if (since) {
      params = params.set('since', since);
    }
    return this.http.get<Message[]>(`${baseUrl}/groups/read`, { params });
  }

  createGroup(group: GroupCreate): Observable<Group> { // TODO Observable<void>
    return this.http.post<Group>(`${baseUrl}/groups/create`, group);
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/groups/delete?groupID=${groupId}`);
  }
}
