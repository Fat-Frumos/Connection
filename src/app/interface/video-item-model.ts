import {Snippet} from '@app/interface/snippet-model';
import {Statistics} from '@app/interface/statistics-model';

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  color: string;
  snippet: Snippet;
  statistics: Statistics;
}
