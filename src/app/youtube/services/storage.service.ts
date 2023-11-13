import { Injectable } from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';

@Injectable()
export class StorageService {

  saveVideo(video: VideoItem):void {
    localStorage.setItem('video', JSON.stringify(video));
  }
}
