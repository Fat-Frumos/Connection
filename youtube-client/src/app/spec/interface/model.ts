import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Thumbnails} from '@app/youtube/models/thumbnails-model';
import {
  Id,
  VideoListResponse, VideoResponse
} from '@app/youtube/models/video-list-response-model';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {Statistics} from '@app/youtube/models/statistics-model';
import {Snippet} from '@app/youtube/models/snippet-model';
import {User} from '@app/auth/models/user';
import {YoutubeResponse} from '@app/youtube/models/youtube-response';

export const criteria: CriteriaModel = {
  field: SortField.DATE,
  order: Direction.ASC
};

export const orderByDate = {field: SortField.DATE, order: Direction.DESC};

export const orderByView = {field: SortField.VIEW, order: Direction.DESC};

export const descendingDate: CriteriaModel = {
  field: SortField.DATE,
  order: Direction.DESC
};

export const statistics: Statistics = {
  viewCount: '200',
  likeCount: '80',
  dislikeCount: '8',
  favoriteCount: '15',
  commentCount: '30'
};
export const snippet2: Snippet = {
  channelId: 'channelId2',
  title: 'Title 2',
  description: 'Description 2',
  thumbnails: {} as Thumbnails,
  publishedAt: new Date('2024-02-02').toISOString(),
  channelTitle: 'Channel Title 2',
  tags: ['tag3', 'tag4'],
  categoryId: 'categoryId2',
  liveBroadcastContent: 'live',
  localized: {
    title: 'Localized Title 2',
    description: 'Localized Description 2'
  },
  defaultAudioLanguage: 'en'
};
export const customCards: CustomCard[] = [
  {
    id: {kind: 'kind', videoId: 'videoId1'},
    snippet: {
      channelId: 'channelId1',
      title: 'Title 1',
      description: 'Description 1',
      thumbnails: {} as Thumbnails,
      publishedAt: new Date('2024-02-02').toISOString(),
      channelTitle: 'Channel Title 1',
      tags: ['tag1', 'tag2'],
      categoryId: 'categoryId1',
      liveBroadcastContent: 'live',
      localized: {
        title: 'Localized Title 1',
        description: 'Localized Description 1'
      },
      defaultAudioLanguage: 'en'
    },
    title: 'Title 1',
    description: 'Description 1',
    imageUrl: 'image1.jpg',
    videoUrl: 'video1.mp4',
    publishedAt: '2024-01-02',
    creationDate: new Date(),
    statistics: {
      viewCount: '100',
      likeCount: '50',
      dislikeCount: '5',
      favoriteCount: '10',
      commentCount: '20'
    }
  },
  {
    id: {} as Id,
    snippet: snippet2,
    title: 'Title 2',
    description: 'Description 2',
    imageUrl: 'image2.jpg',
    videoUrl: 'video2.mp4',
    publishedAt: '2024-02-02',
    creationDate: new Date(),
    statistics: statistics
  }
];

export const videoItem: VideoItem = {
  id: {videoId: '1', kind: ''},
  kind: '',
  etag: '',
  snippet: snippet2,
  statistics: statistics
};

export const user: User = {password: 'Test User', email: 'test@example.com'};

export const response: YoutubeResponse = {
  items: customCards,
  id: 'test_id'
};

export const videoResponse: VideoResponse = {
  kind: 'test_kind',
  videoId: 'test_video_id',
  etag: 'test_video_etag',
  statistics: {
    viewCount: '1000',
    likeCount: '500',
    dislikeCount: '50',
    favoriteCount: '200',
    commentCount: '100'
  }
};

export const statisticsResponse: VideoListResponse = {
  kind: 'test_kind',
  etag: 'test_etag',
  items: Array.of(videoResponse),
  pageInfo: {
    totalResults: 10,
    resultsPerPage: 5
  }
};
