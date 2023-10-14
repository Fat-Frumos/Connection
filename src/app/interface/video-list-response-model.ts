import {VideoItem} from '@app/interface/video-item-model';

export interface VideoListResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoItem[];
}
