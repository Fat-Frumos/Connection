import {Pipe, PipeTransform} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(video: VideoItem[], search: string, criteria: string): VideoItem[] {

    return video.filter((item: VideoItem) => {
      const title: string = item.snippet.title.toLowerCase();
      return this.match(search.toLowerCase(), title)
        && this.match(criteria.toLowerCase(), title);
    });
  }

  private match(value: string, title: string): boolean {
    return !value?.trim() ? true : title.includes(value.trim());
  }
}
