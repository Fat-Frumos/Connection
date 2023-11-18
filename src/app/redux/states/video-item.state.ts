import {VideoItem} from '@app/youtube/models/video-item-model';

export interface VideoState {
  videos: VideoItem[];
}

export const initialState: VideoState = {
  videos: []
};
