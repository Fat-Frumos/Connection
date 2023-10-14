import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {VideoService} from '@app/service/video.service';
import {VideoItem} from '@app/interface/video-item-model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnDestroy {
  videos: VideoItem[] = [];

  private subscription$: Subscription = new Subscription();

  constructor(public readonly videoService: VideoService) {
    this.subscription$.add(
      this.videoService.videos$.subscribe((videos: VideoItem[]) => {
        this.videos = videos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
