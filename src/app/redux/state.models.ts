import {EntityState} from '@ngrx/entity';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {VideoItem} from '@app/youtube/models/video-item-model';

export interface CardState extends EntityState<CustomCard> {
  customCards: CustomCard[];
  videos: VideoItem[];
  currentPage: number;
}
