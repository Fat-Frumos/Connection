import {Component, Input, ViewEncapsulation} from '@angular/core';
import {VideoService} from '@app/service/video.service';
import {VideoItem} from '@app/model/video-item-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

  @Input() videos!: VideoItem[];

  constructor(
    private readonly videoService: VideoService) {
    this.videoService.videos$.subscribe((videos) => {
      this.videos = videos;
    });
  }
}
