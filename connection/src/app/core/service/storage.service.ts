import {Injectable} from '@angular/core';
import {AuthData, Groups} from '@app/model/message/message-response.models';
import {People} from '@app/model/user/user-profile-response.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getGroups(): string[] {
    const authData = this.getAuth();
    return authData ? this.getGroup()[authData.uid] || [] : [];
  }

  getPeopleFromStorage(): People[] {
    const peopleValue = localStorage.getItem('people');
    return peopleValue ? (JSON.parse(peopleValue) as People[]) : [];
  }

  addPeopleToStorage(conversationID: People[]) {
    localStorage.setItem('people', JSON.stringify([...conversationID]));
  }

  private getGroup(): Groups {
    const groupsValue = localStorage.getItem('groups');
    return groupsValue && JSON.parse(groupsValue) as Groups || {};
  }

  addGroupToStorage(groupID: string) {
    const uid = this.getAuth().uid;
    if (uid) {
      const groups = this.getGroup();
      groups[uid] = groups[uid]
        ? [...new Set([...groups[uid], groupID])]
        : [...new Set([groupID])];
      localStorage.setItem('groups', JSON.stringify(groups));
    }
  }

  private getAuth(): AuthData {
    const auth = localStorage.getItem('auth');
    return (auth && JSON.parse(auth)) as AuthData || {};
  }

  removeGroupFromStorage(groupID: string) {
    const uid = this.getAuth().uid;
    if (uid) {
      const groups = this.getGroup();
      if (groups) {
        groups[uid] = groups[uid].filter((id: string) => id !== groupID);
        localStorage.setItem('groups', JSON.stringify(groups));
      }
    }
  }
}
