export interface VideoListResponse {
  kind: string;
  etag: string;
  items: VideoResponse[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface VideoResponse extends Id {
  etag: string;
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface Id {
  kind: string;
  videoId: string;
}
