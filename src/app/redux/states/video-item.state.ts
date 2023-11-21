import {VideoItem} from '@app/youtube/models/video-item-model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const videoAdapter =
  createEntityAdapter<VideoItem>();

export interface VideoState extends EntityState<VideoItem> {
  video: VideoItem | null
  isFetched: boolean
}

export const initialState: VideoState =
  videoAdapter.getInitialState({
    video: null,
    isFetched: false
  });

