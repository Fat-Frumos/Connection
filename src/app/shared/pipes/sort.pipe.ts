import {Pipe, PipeTransform} from '@angular/core';
import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

@Pipe({
  name: 'sortBy'
})
export class SortPipe implements PipeTransform {
  transform(videos: CustomCard[], criteria: CriteriaModel): CustomCard[] {
    const {field, order} = criteria;

    if (field === SortField.DATE) {
      videos.sort((a: CustomCard, b: CustomCard): number => {
        return this.sorted(
          new Date(a.snippet.publishedAt).getTime(),
          new Date(b.snippet.publishedAt).getTime(), order);
      });
    }
    return videos;
  }

  private sorted(a: number, b: number, sort: Direction): number {
    return sort === Direction.ASC ? a - b : b - a;
  }
}
