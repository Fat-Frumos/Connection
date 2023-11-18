import {Snippet} from '@app/youtube/models/snippet-model';
import {Statistics} from '@app/youtube/models/statistics-model';

export interface VideoItem {
  kind: string;
  etag: string;
  id: {
    kind: string,
    videoId: string
  };
  snippet: Snippet;
  statistics: Statistics;
}
