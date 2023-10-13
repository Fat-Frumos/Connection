import {Snippet} from '@app/interface/snippet';

export interface VideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
}
