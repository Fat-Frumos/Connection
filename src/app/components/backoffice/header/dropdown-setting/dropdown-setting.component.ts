import {Component, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-dropdown-setting',
  templateUrl: './dropdown-setting.component.html',
  styleUrls: ['./dropdown-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownSettingComponent {
  criteria!: string;

  videos: VideoItem[] = [];

  constructor(private videoService: VideoService) {
    this.videoService.videos$.subscribe(
      (videos: VideoItem[]): void => {
        this.videos = videos;
      });
  }

  onSort(className: string): void {
    const sortStrategies: { [key: string]: () => void } = {
      'date': () => this.sortByDate(),
      'count-of-views': () => this.sortByViews(),
      'sort-input-field': () => this.filterResults(this.criteria)
    };

    const sortStrategy = sortStrategies[className as keyof typeof sortStrategies];
    if (sortStrategy) {
      sortStrategy();
    }
  }

  private sortByDate(): void {
    this.videos.sort((a: VideoItem, b: VideoItem) =>
      new Date(a.snippet.publishedAt).getTime()
      - new Date(b.snippet.publishedAt).getTime());
  }

  private sortByViews(): void {
    this.videos.sort((a: VideoItem, b: VideoItem) =>
      a.statistics.viewCount - b.statistics.viewCount);
  }

  filterResults(searchValue: string): void {
    this.videos = this.videos.filter((video: VideoItem) =>
      video.snippet.title.includes(searchValue));
  }
}
