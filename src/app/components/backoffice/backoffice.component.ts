import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {VideoItem} from '@app/model/video-item-model';
import {CriteriaModel, Direction, SortField} from '@app/model/criteria-model';
import {VideoService} from '@app/service/video.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BackofficeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  videos$!: Observable<VideoItem[]>;

  searchText = '';

  criteria = '';

  sortField: CriteriaModel;

  constructor(
    private service: VideoService) {
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
