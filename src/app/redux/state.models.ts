import {EntityState} from '@ngrx/entity';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export interface CardState extends EntityState<CustomCard> {
  favoriteVideos: CustomCard[];
  currentPage: number;
}
