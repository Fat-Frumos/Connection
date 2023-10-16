import {Pipe, PipeTransform} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(value: VideoItem[], search: string): VideoItem[] {
    return search ? value.filter((item: VideoItem) =>
      item.snippet.title.toLowerCase() === search.toLowerCase()) : value;
  }
}
