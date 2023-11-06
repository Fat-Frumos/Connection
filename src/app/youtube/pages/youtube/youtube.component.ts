import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';
import {VideoService} from '@app/youtube/services/video.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class YoutubeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  videos$: Observable<VideoItem[]>;

  searchText = '';

  criteria = '';

  sortField: CriteriaModel;

  constructor(private service: VideoService) {
    this.videos$ = new Observable<VideoItem[]>();
    this.sortField = {order: Direction.ASC, field: SortField.DATE};
  }

  ngOnInit(): void {
    this.videos$ = this.service.videos$;
    this.subscriptions.push(
      this.service.sortService.searchText$.subscribe((searchText) => {
        this.searchText = searchText;
      }),
      this.service.sortService.sortFields$.subscribe((sortField) => {
        this.sortField = sortField;
      }),
      this.service.sortService.criteria$.subscribe((criteria) => {
        this.criteria = criteria;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
