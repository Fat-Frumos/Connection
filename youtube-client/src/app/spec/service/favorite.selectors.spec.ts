import { describe, expect, it} from '@jest/globals';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {
  getFavoriteVideos,
  selectFavoriteState,
  selectFavoriteVideos, selectIsFavorite
} from '@app/redux/selectors/favorite.selectors';
import {FavoriteState} from '@app/redux/states/favorite.state';
describe('Selectors', () => {
  const initialState: FavoriteState = {
    favoriteVideos: [
      { id: { videoId: 'test1' } } as CustomCard,
      { id: { videoId: 'test2' } } as CustomCard
    ],
    currentPage: 1
  };

  it('should select the favorite state', () => {
    const result = selectFavoriteState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the favorite videos', () => {
    const result = selectFavoriteVideos.projector(initialState);
    expect(result).toEqual(initialState.favoriteVideos);
  });

  it('should select if a video is favorite', () => {
    const result = selectIsFavorite('test1').projector(initialState.favoriteVideos);
    expect(result).toBe(true);
  });

  it('should get the favorite videos', () => {
    const result = getFavoriteVideos.projector(initialState.favoriteVideos);
    expect(result).toEqual(initialState.favoriteVideos);
  });
});
