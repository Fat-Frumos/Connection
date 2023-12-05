import {Pipe, PipeTransform} from '@angular/core';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(video: CustomCard[], search: string, criteria: string): CustomCard[] {

    return video.filter((item: CustomCard) => {
      const title: string = item.snippet.title.toLowerCase();
      return this.match(search.toLowerCase(), title)
        && this.match(criteria.toLowerCase(), title);
    });
  }

  private match(value: string, title: string): boolean {
    return !value?.trim() ? true : title.includes(value.trim());
  }
}
