import {Snippet} from '@app/youtube/models/snippet-model';
import {Statistics} from '@app/youtube/models/statistics-model';
import {Id} from '@app/youtube/models/video-list-response-model';

export interface VideoItem {
  id: Id;
  kind: string;
  etag: string;
  snippet: Snippet;
  statistics: Statistics;
}
