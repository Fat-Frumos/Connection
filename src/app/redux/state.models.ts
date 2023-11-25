import {EntityState} from '@ngrx/entity';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {User} from '@app/auth/models/user';

export interface CardState extends EntityState<CustomCard> {
  customCards: CustomCard[];
  videos: VideoItem[];
  currentPage: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  error: string;
}

export interface UserState {
  user: User | null,
  isFetched: boolean;
}

export interface AppState {
  auth: AuthState;
  user: UserState;
  video: VideoItem;
}
