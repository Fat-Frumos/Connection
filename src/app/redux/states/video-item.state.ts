import {VideoItem} from '@app/youtube/models/video-item-model';
import {createEntityAdapter, EntityState} from '@ngrx/entity';

export const videoAdapter =
  createEntityAdapter<VideoItem>();

export interface VideoState extends EntityState<VideoItem> {
  videos: VideoItem[];
}

export const initialState: VideoState =
  videoAdapter.getInitialState({videos: []});

export const {selectAll: selectAllVideos} = videoAdapter.getSelectors();
