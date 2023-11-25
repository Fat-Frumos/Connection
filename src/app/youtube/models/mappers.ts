import {VideoItem} from '@app/youtube/models/video-item-model';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

export const toCustomCard = (video: VideoItem): CustomCard => {
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    imageUrl: video.snippet.thumbnails.default.url,
    videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    snippet: video.snippet,
    publishedAt: video.snippet.publishedAt,
    statistics: video.statistics,
    creationDate: new Date()
  };
};

export const toVideoItems = (customCards: CustomCard[]): VideoItem[] => {
  return customCards.map(customCard => ({
    kind: 'youtube#video',
    etag: '',
    id: {
      kind: 'youtube#video',
      videoId: customCard.id.videoId
    },
    snippet: customCard.snippet,
    statistics: customCard.statistics
  }));
};

