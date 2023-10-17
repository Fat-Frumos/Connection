import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoItem} from '@app/interface/video-item-model';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  @Input() videos: VideoItem[] = [];

  searchText = '';

  constructor(
    private readonly videoService: VideoService) {
    this.videoService.getVideos$()
      .subscribe((videos: VideoItem[]): void => {
        this.videos = videos;
      });
  }

  onSort(criteria: string): void {
    this.videos = this.videoService.onSort(criteria);
  }

  onFilter(searchText: string): void {
    this.searchText = searchText;
    this.videos = this.videoService.onFilter(
      this.videoService.getAllVideos(), searchText);
  }
}
