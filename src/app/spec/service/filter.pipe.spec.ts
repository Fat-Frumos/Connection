import { FilterByPipe } from '@app/shared/pipes/filter.pipe';
import {expect, describe, beforeEach, it} from '@jest/globals';
import {customCards} from '@app/spec/interface/model';

describe('FilterByPipe', () => {
  let pipe: FilterByPipe;
  beforeEach(() => {
    pipe = new FilterByPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original array when no search and criteria provided', () => {
    const result = pipe.transform(customCards, '', '');
    expect(result).toEqual(customCards);
  });

  it('should filter videos by title', () => {
    const result = pipe.transform(customCards, 'Title 2', '');
    const expected = customCards.filter(card => card.snippet.title === 'Title 2');
    expect(result).toEqual(expected);
  });

  it('should filter videos by both title and criteria', () => {
    const result = pipe.transform(customCards, 'Description', 'another');
    const expected = customCards.filter(
      card => card.snippet.title === 'Title 2' && card.description.includes('another')
    );
    expect(result).toEqual(expected);
  });
});
