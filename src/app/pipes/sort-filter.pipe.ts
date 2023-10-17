import {Pipe, PipeTransform} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';

@Pipe({
  name: 'filter'
})
export class SortFilterPipe implements PipeTransform {

  transform(videos: VideoItem[], search: string): VideoItem[] {
    if (!videos) {
      return [];
    }
    if (!search) {
      return videos;
    }

    return videos.filter((item: VideoItem): boolean =>
      item.snippet.title.toLowerCase().includes(search.toLowerCase()));
  }
}
