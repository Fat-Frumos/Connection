import {Component} from '@angular/core';
import {VideoListResponse} from '@app/interface/video-list-response';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent {

  constructor(private readonly videoService: VideoService) {
    const videoData: VideoListResponse = this.videoService.getVideoData();
    console.log(videoData);
  }
}
