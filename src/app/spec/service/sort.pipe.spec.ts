import 'jest';
import {SortPipe} from '@app/shared/pipes/sort.pipe';
import {criteria, descendingDate, customCards} from '@app/spec/interface/model';
import {expect, describe, beforeEach, it } from '@jest/globals';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('should sort videos by date in ascending order', () => {
    const sortedVideos = pipe.transform([...customCards], criteria);
    expect(sortedVideos[0].snippet.publishedAt).toEqual(new Date('2024-02-02').toISOString());
    expect(sortedVideos[1].snippet.publishedAt).toEqual(new Date('2024-02-02').toISOString());
  });

  it('should sort videos by date in descending order', () => {

    const sortedVideos = pipe.transform([...customCards], descendingDate);
    expect(sortedVideos[0].snippet.publishedAt).toEqual(new Date('2024-02-02').toISOString());
    expect(sortedVideos[1].snippet.publishedAt).toEqual(new Date('2024-02-02').toISOString());
  });
});
