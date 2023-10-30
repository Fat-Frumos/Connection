import {Pipe, PipeTransform} from '@angular/core';
import {VideoItem} from '@app/model/video-item-model';
import {CriteriaModel, Direction, SortField} from '@app/model/criteria-model';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {
  transform(videos: VideoItem[], criteria: CriteriaModel): VideoItem[] {
    const {field, order} = criteria;

    if (field === SortField.DATE) {
      videos.sort((a: VideoItem, b: VideoItem): number => {
        return this.sorted(
          new Date(a.snippet.publishedAt).getTime(),
          new Date(b.snippet.publishedAt).getTime(), order);
      });
    }

    if (field === SortField.VIEW) {
      videos.sort((a: VideoItem, b: VideoItem): number => {
        return this.sorted(
          a.statistics.viewCount,
          b.statistics.viewCount, order);
      });
    }
    return videos;
  }

  private sorted(a: number, b: number, sort: Direction): number {
    return sort === Direction.ASC ? a - b : b - a;
  }
}
