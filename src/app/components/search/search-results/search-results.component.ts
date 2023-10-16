import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {VideoService} from '@app/service/video.service';
import {VideoItem} from '@app/interface/video-item-model';
import {Subscription} from 'rxjs';
import {SearchService} from '@app/service/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchResultsComponent implements OnDestroy {
  videos: VideoItem[] = [];

  searchText = '';

  private subscription$: Subscription;

  constructor(
    private readonly videoService: VideoService,
    private readonly searchService: SearchService) {
    this.subscription$ = new Subscription();
    this.subscription$.add(
      this.videoService.videos$.subscribe((videos: VideoItem[]) => {
        this.videos = videos;
      })
    );
    this.searchService.searchText$.subscribe(
      text => {
        this.searchText = text;
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
