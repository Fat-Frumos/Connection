import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {toggleFavorite} from '@app/redux/actions/favorite.actions';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {VideoService} from '@app/youtube/services/video.service';
import {
  CriteriaModel,
  Direction,
  SortField
} from '@app/shared/models/criteria-model';
import {Observable, Subscription} from 'rxjs';
import {getIsFetched} from '@app/redux/reducers/video-item.reducer';
import {fetchUser} from '@app/redux/actions/user.actions';
import {SortService} from '@app/youtube/services/sort.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {

  criteria = '';

  searchText = '';

  sortField: CriteriaModel;

  videos$: Observable<CustomCard[]>;

  private isFetched: Observable<boolean>;

  private subscriptions: Subscription [];

  constructor(
    private service: VideoService,
    private sortService: SortService,
    private store: Store
  ) {
    this.videos$ = this.service.videos$;
    this.subscriptions = [];
    this.isFetched = this.store.select(getIsFetched);
    this.sortField = {order: Direction.ASC, field: SortField.DATE};
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUser());

    this.subscriptions.push(
      this.sortService.searchText$.subscribe((searchText) => {
        this.searchText = searchText;
      }),
      this.sortService.sortFields$.subscribe((sortField) => {
        this.sortField = sortField;
      }),
      this.sortService.criteria$.subscribe((criteria) => {
        this.criteria = criteria;
      })
    );
  }

  toggleFavorite(videoId: string): void {
    this.store.dispatch(toggleFavorite({videoId}));
  }
}
