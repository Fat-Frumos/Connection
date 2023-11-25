import {Snippet} from '@app/youtube/models/snippet-model';
import {Statistics} from '@app/youtube/models/statistics-model';
import {Id} from '@app/youtube/models/video-list-response-model';

export interface CustomCard {
  id: Id;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  snippet: Snippet;
  publishedAt: string;
  creationDate: Date;
  statistics: Statistics;
}
