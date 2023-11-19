import {createFeatureSelector, createSelector} from '@ngrx/store';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {CardState} from '@app/redux/state.models';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {selectFavoriteVideos} from '@app/redux/selectors/favorite.selectors';
import {VideoState} from '@app/redux/states/video-item.state';

export const selectVideoState =
  createFeatureSelector<VideoState>('video');

export const selectAllVideos =
  createSelector(selectVideoState, (state) =>
    Object.values(state.videos));

export const selectVideoById = (videoId: string) =>
  createSelector(
    selectAllVideos,
    (videos) => videos.find(video => video.id.videoId === videoId)
  );

export const selectCustomCardState =
  createFeatureSelector<CardState>('customCard');


export const selectAllCustomCards =
  createSelector(selectCustomCardState,
    (state: CardState) => state.customCards);

export const selectCombinedList =
  createSelector(selectAllVideos, selectFavoriteVideos,
    (videos, favorites) =>
      [...favorites, ...videos]);

export const selectCustomCardsByPage = (page: number, pageSize: number) =>
  createSelector(
    selectAllCustomCards,
    (customCards: CustomCard[]) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return customCards.slice(startIndex, endIndex);
    }
  );

export const mapperVideoItemToCard = (video: VideoItem): CustomCard => {
  return {
    id: video.id.videoId,
    title: video.snippet.title,
    description: video.snippet.description,
    imageUrl: video.snippet.thumbnails.default.url,
    videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    creationDate: new Date()
  };
};
