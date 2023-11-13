import {VideoItem} from '@app/youtube/models/video-item-model';

export interface YoutubeResponse {
  kind: string;
  etag: string;
  items: VideoItem[];
}
