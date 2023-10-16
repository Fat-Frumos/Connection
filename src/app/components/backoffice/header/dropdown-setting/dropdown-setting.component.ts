import {Component} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-dropdown-setting',
  templateUrl: './dropdown-setting.component.html',
  styleUrls: ['./dropdown-setting.component.scss']
})
export class DropdownSettingComponent {
  searchValue!: string;

  videos: VideoItem[] = [];

  constructor(private videoService: VideoService) {
    this.videoService.videos$.subscribe(videos => {
      this.videos = videos;
    });
  }

  onSort(className: string) {
    const sortStrategies: { [key: string]: () => void } = {
      'date': () => this.sortByDate(),
      'count-of-views': () => this.sortByViews(),
      'sort-input-field': () => this.filterResults()
    };

    const sortStrategy = sortStrategies[className as keyof typeof sortStrategies];
    if (sortStrategy) {
      sortStrategy();
    }
  }

  private sortByDate() {
    this.videos.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime());
  }

  private sortByViews() {
    this.videos.sort((a, b) => a.statistics.viewCount - b.statistics.viewCount);
  }

  filterResults() {
    this.videos = this.videos.filter(video => video.snippet.title.includes(this.searchValue));
  }
}
