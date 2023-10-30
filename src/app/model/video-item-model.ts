import {Snippet} from '@app/model/snippet-model';
import {Statistics} from '@app/model/statistics-model';

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}
