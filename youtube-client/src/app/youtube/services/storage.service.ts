import {Injectable} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {VideoDataModel} from '@app/youtube/models/video-data-model';
import {User} from '@app/auth/models/user';

@Injectable()
export class StorageService {

  saveVideo(video: VideoItem): void {
    localStorage.setItem('video', JSON.stringify(video));
  }

  getVideo(): VideoDataModel {
    const item = localStorage.getItem('video');
    return item
      ? JSON.parse(item) as VideoDataModel
      : {} as VideoDataModel;
  }

  getUser(): User {
    const item = localStorage.getItem('user');
    return item
      ? JSON.parse(item) as User
      : {} as User;
  }

  login(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.setItem('user', '');
  }
}
