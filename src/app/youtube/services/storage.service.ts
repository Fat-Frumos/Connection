import {Injectable} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {VideoDataModel} from '@app/youtube/models/video-data-model';

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
}
