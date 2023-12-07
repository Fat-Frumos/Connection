import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from '@app/model/conversation/group.model';
import {GroupCreate} from '@app/model/conversation/group-create.model';
import {GroupResponse} from '@app/model/conversation/group-response.model';
import {ToastService} from '@app/shared/component/toast/toast.service';

@Injectable()
export class GroupService {

  http: HttpClient = inject(HttpClient);

  toast: ToastService = inject(ToastService);

  getGroups(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`/groups/list`);
  }

  createGroup(group: GroupCreate): Observable<Group> {
    return this.http.post<Group>(`/groups/create`, group);
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`/groups/delete?groupID=${groupId}`);
  }
}
