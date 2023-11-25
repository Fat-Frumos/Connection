import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export interface YoutubeResponse {
  items: CustomCard[];
  id: string;
}
